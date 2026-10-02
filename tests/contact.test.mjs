import test from "node:test";
import assert from "node:assert/strict";
import { createChallenge, verifyChallenge, validateContact, allowRequest } from "../lib/contact.mjs";

function payload() { const challenge = createChallenge(); const [a, , b] = challenge.question.split(" "); return { name: "Test migrace", email: "test@example.com", message: "Testovací zpráva", challengeToken: challenge.token, answer: String(Number(a) + Number(b)), consent: "on" }; }
test("valid inquiry passes server validation", () => { assert.ok(validateContact(payload()).data); assert.ok(validateContact(payload(), false).data); });
test("incorrect, altered and expired challenges fail", () => {
  const c = createChallenge(1000);
  assert.equal(verifyChallenge(c.token + "x", "2"), false);
  assert.equal(verifyChallenge(c.token, "999", true, 2000), false);
  assert.equal(verifyChallenge(c.token, "", false, 1801001), false);
  assert.equal(verifyChallenge(c.token, "", false, 2000), true);
});
test("server rejects invalid email, header injection, excessive data and honeypot", () => {
  for (const patch of [{ email: "invalid" }, { name: "Test\r\nBcc: someone@example.com" }, { subject: "Hello\nWorld" }, { message: "x".repeat(1801) }, { website: "spam.example.com" }, { name: ["Test"] }]) assert.ok(validateContact({ ...payload(), ...patch }).error);
});
test("Powerdrive requires consent", () => { assert.ok(validateContact({ ...payload(), consent: "" }, false).error); });
test("throttle limits repeated requests and expires", () => { const key = "test-" + Date.now(); assert.equal(allowRequest(key, 2, 1000), true); assert.equal(allowRequest(key, 2, 1001), true); assert.equal(allowRequest(key, 2, 1002), false); assert.equal(allowRequest(key, 2, 602000), true); });
