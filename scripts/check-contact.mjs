// Integration check against a real production server and a local SMTP sink.
// No email leaves the machine. Run after `npm run build`.
import assert from "node:assert/strict";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { once } from "node:events";
const site = JSON.parse(await fs.readFile("content/site.json", "utf8"));
const messages = [];
const smtp = createServer(socket => {
  socket.setEncoding("utf8"); socket.write("220 localhost test SMTP\r\n");
  let buffer = "", message = "", receiving = false;
  socket.on("data", chunk => {
    buffer += chunk;
    while (buffer.includes("\r\n")) {
      const end = buffer.indexOf("\r\n"), line = buffer.slice(0, end); buffer = buffer.slice(end + 2);
      if (receiving) {
        if (line === ".") { receiving = false; messages.push(message); message = ""; socket.write("250 accepted locally\r\n"); }
        else message += line + "\r\n";
      } else if (/^EHLO|^HELO/i.test(line)) socket.write("250-localhost\r\n250 AUTH PLAIN\r\n");
      else if (/^AUTH /i.test(line)) socket.write("235 test authentication accepted\r\n");
      else if (/^DATA/i.test(line)) { receiving = true; socket.write("354 end with dot\r\n"); }
      else if (/^QUIT/i.test(line)) socket.end("221 bye\r\n");
      else socket.write("250 OK\r\n");
    }
  });
});
smtp.listen(0, "127.0.0.1"); await once(smtp, "listening");
const reservation = createServer(); reservation.listen(0, "127.0.0.1"); await once(reservation, "listening");
const port = reservation.address().port; await new Promise(resolve => reservation.close(resolve));
const base = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  env: { ...process.env, NODE_ENV: "production", CONTACT_MODE: "smtp", CONTACT_SECRET: "local-integration-test-only-32-characters", CONTACT_ALLOWED_ORIGINS: base,
    SMTP_HOST: "127.0.0.1", SMTP_PORT: String(smtp.address().port), SMTP_SECURE: "false", SMTP_USER: "sender@example.com", SMTP_PASSWORD: "test-only", CONTACT_FROM: "sender@example.com", CONTACT_TO: "recipient@example.com" },
  stdio: ["ignore", "pipe", "pipe"], windowsHide: true,
});
let output = ""; child.stdout.on("data", b => { output += b; }); child.stderr.on("data", b => { output += b; });
const checks = [];
try {
  for (let attempt = 0; attempt < 80; attempt++) { try { if ((await fetch(base + "/api/contact")).ok) break; } catch {} if (child.exitCode !== null) throw new Error(output); await new Promise(resolve => setTimeout(resolve, 100)); }
  const challenge = await (await fetch(base + "/api/contact")).json();
  const numbers = challenge.question.match(/\d+/g).map(Number);
  const data = { name: "Integration check", email: "test@example.com", message: "Local SMTP integration check", consent: "on", challengeToken: challenge.token, answer: String(numbers[0] + numbers[1]) };
  const post = (body, origin = base, type = "application/json") => fetch(base + "/api/contact", { method: "POST", headers: { Origin: origin, "Content-Type": type }, body: typeof body === "string" ? body : JSON.stringify(body) });
  assert.equal((await post(data, "https://untrusted.example")).status, 403); checks.push("cross-origin request rejected");
  assert.equal((await post(data, base, "text/plain")).status, 415); checks.push("unsupported content type rejected");
  assert.equal((await post("{" )).status, 400); checks.push("malformed JSON rejected");
  assert.equal((await post({ ...data, email: "invalid" })).status, 400); checks.push("invalid input rejected");
  assert.equal((await post("x".repeat(12001))).status, 413); checks.push("oversized body rejected");
  if (site.id === "pro") { assert.equal((await post({ ...data, answer: "999" })).status, 400); checks.push("incorrect challenge rejected"); }
  else { assert.equal((await post({ ...data, consent: "" })).status, 400); checks.push("missing consent rejected"); }
  const response = await post(data); assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
  assert.equal(messages.length, 1); assert.match(messages[0], /To: recipient@example.com/); assert.match(messages[0], /Reply-To: Integration check <test@example.com>/); assert.match(messages[0].replace(/=\r\n/g, ""), /Local SMTP integration check/);
  checks.push("production endpoint delivers exactly one message to the local SMTP sink");
  for (let count = 0; count < 4; count++) assert.equal((await post(data)).status, 200);
  assert.equal((await post(data)).status, 429); checks.push("repeated submissions are throttled");
  await fs.writeFile("migration/contact-integration.json", JSON.stringify({ checkedAt: new Date().toISOString(), site: site.id, checks, externalEmailsSent: 0 }, null, 2));
  console.log(`${site.name}: ${checks.length} integration checks passed; no external email sent.`);
} finally { child.kill(); smtp.close(); }
