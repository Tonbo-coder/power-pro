import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createHash } from "node:crypto";
import { allowRequest, allowedContactOrigins, createChallenge, validateContact } from "@/lib/contact.mjs";
import site from "@/content/site.json";
export const runtime = "nodejs";
export function GET() { return NextResponse.json(createChallenge(), { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: NextRequest) {
  const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
  const origin = request.headers.get("origin");
  const allowedOrigins = allowedContactOrigins(site.url);
  if (process.env.NODE_ENV !== "production") allowedOrigins.add(new URL(request.url).origin);
  if (!origin || !allowedOrigins.has(origin)) return fail("Požadavek pochází z nepovoleného webu.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return fail("Neplatný formát požadavku.", 415);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 12000) return fail("Zpráva je příliš dlouhá.", 413);
  let input; try { input = JSON.parse(raw); } catch { return fail("Neplatný formulář."); }
  const result = validateContact(input, site.id === "pro");
  if (result.error || !result.data) return fail(result.error || "Neplatný formulář.");
  const data = result.data;
  const key = createHash("sha256").update(data.email.toLowerCase()).digest("hex");
  if (!allowRequest("global", 100) || !allowRequest(key)) return fail("Zpráv bylo příliš mnoho. Zkuste to prosím později.", 429);
  if (process.env.CONTACT_MODE === "preview" && process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, preview: true });
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return fail("Odesílání e-mailů zatím není nakonfigurováno.", 503);
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE !== "false", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }, connectionTimeout: 10000, socketTimeout: 15000 });
  try {
    await transporter.sendMail({ from: process.env.CONTACT_FROM || process.env.SMTP_USER, to: process.env.CONTACT_TO || site.email,
      replyTo: { name: data.name, address: data.email }, subject: `Kontaktní formulář | ${site.name}${data.subject ? " – " + data.subject : ""}`,
      text: [`Jméno: ${data.name}`, `E-mail: ${data.email}`, `Telefon: ${data.phone || "Neuvedeno"}`, `Služba: ${data.service || "Neuvedeno"}`, "", data.message].join("\n") });
    return NextResponse.json({ ok: true });
  } catch { return fail("Zprávu se nyní nepodařilo doručit. Zkuste to prosím později.", 502); }
  finally { transporter.close(); }
}
