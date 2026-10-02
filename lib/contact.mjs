import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const fallbackSecret = randomBytes(32).toString("hex");
const signature = body => createHmac("sha256", process.env.CONTACT_SECRET || fallbackSecret).update(body).digest("base64url");
export function createChallenge(now = Date.now()) {
  const values = randomBytes(3);
  const a = values[0] % 8 + 1, b = values[1] % 8 + 1;
  const body = Buffer.from(JSON.stringify({ a, b, time: now, nonce: randomBytes(12).toString("hex") })).toString("base64url");
  return { question: `${a} + ${b} = ?`, token: `${body}.${signature(body)}` };
}
export function verifyChallenge(token, answer, requireAnswer = true, now = Date.now()) {
  if (typeof token !== "string" || token.length > 500) return false;
  try {
    const parts = token.split("."); if (parts.length !== 2) return false;
    const [body, sig] = parts, expected = signature(body);
    if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    return data.time <= now && now - data.time < 30 * 60 * 1000 && (!requireAnswer || String(data.a + data.b) === String(answer).trim());
  } catch { return false; }
}
export function validateContact(input, isPro = true) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Neplatný formulář." };
  const limits = { name: 160, email: 254, subject: 160, phone: 160, service: 160, message: 1800, website: 160 };
  const clean = { name: "", email: "", subject: "", phone: "", service: "", message: "", website: "" };
  for (const [key, max] of Object.entries(limits)) {
    if (input[key] !== undefined && typeof input[key] !== "string") return { error: "Neplatný formát údajů." };
    clean[key] = (input[key] || "").trim();
    if (clean[key].length > max) return { error: "Některé pole je příliš dlouhé." };
  }
  if (clean.website) return { error: "Formulář nebyl přijat." };
  if (!clean.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return { error: "Vyplňte jméno a platný e-mail." };
  if ([clean.email, clean.name, clean.subject].some(s => /[\r\n]/.test(s))) return { error: "Neplatný formát údajů." };
  if (clean.message && clean.message.length < 5) return { error: "Zpráva musí obsahovat alespoň 5 znaků." };
  if (!isPro && input.consent !== "on") return { error: "Potvrďte souhlas se zpětným kontaktem." };
  if (!verifyChallenge(input.challengeToken, input.answer, isPro)) return { error: "Ověření vypršelo nebo není správné. Vyplňte prosím nové ověření." };
  return { data: clean };
}
const limits = new Map();
/** Bounded, process-local throttle. Deploy behind the hosting provider's shared rate limit. */
export function allowRequest(key, max = 5, now = Date.now()) {
  if (limits.size > 2000) for (const [id, item] of limits) if (now > item.until) limits.delete(id);
  if (limits.size > 2000) return false;
  let entry = limits.get(key);
  if (!entry || now > entry.until) { entry = { count: 0, until: now + 600000 }; limits.set(key, entry); }
  entry.count += 1; return entry.count <= max;
}
