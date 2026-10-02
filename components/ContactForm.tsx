"use client";
import { useEffect, useState } from "react";
import site from "@/content/site.json";
import Icon from "@/components/Icon";

type Challenge = { token: string; question: string };
export default function ContactForm() {
  const isPro = site.id === "pro";
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "preview">("idle");
  const [message, setMessage] = useState("");
  const loadChallenge = () => fetch("/api/contact", { cache: "no-store" }).then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(setChallenge).catch(() => setMessage("Ověření se nepodařilo načíst. Obnovte stránku nebo nám napište e-mailem."));
  useEffect(() => { void loadChallenge(); }, []);
  const services = isPro ? ["Vyberte", "Větrné elektrárny", "Zelený vodík", "Bateriové úložiště"] : ["Nejsem si jistý", "Studie & projekt", "AC wallbox", "DC rychlodobíjení", "Správa & servis"];
  const input = (i: number, name: string, label: string, type = "text", required = false) => <div className={`ui-form-group ui-form-builder-field-${i}`}><label htmlFor={`contact-${name}`}>{label}{required && <span className="ui-field-required"> *</span>}</label><input id={`contact-${name}`} name={name} type={type} className="ui-form-control" required={required} maxLength={name === "email" ? 254 : 160} autoComplete={name === "name" ? "name" : name === "phone" ? "tel" : name === "email" ? "email" : "off"} /></div>;
  return <div className="block block-form-builder"><div className="block-content"><form className={`block-form-builder-form ${isPro ? "pro-contact-form" : "contact-form"}`} onSubmit={async event => {
    event.preventDefault(); const form = event.currentTarget;
    if (status === "sending") return;
    setStatus("sending"); setMessage("");
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, challengeToken: challenge?.token }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Zprávu se nepodařilo odeslat.");
      if (result.preview) { setStatus("preview"); setMessage("Test formuláře proběhl v pořádku. V lokálním náhledu se e-mail neodesílá."); form.reset(); void loadChallenge(); }
      else { window.location.assign("/e-mail-podekovani"); }
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Zkontrolujte připojení a zkuste to znovu."); void loadChallenge(); }
  }}>
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Webová stránka</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {input(0, "name", "Jméno", "text", true)}{input(1, "email", "E-mail", "email", true)}{isPro ? input(2, "subject", "Předmět") : input(2, "phone", "Telefon", "tel")}
    <div className="ui-form-group ui-form-builder-field-3"><label htmlFor="contact-service">{isPro ? "Požadovaná služba" : "Služba"}</label><select id="contact-service" name="service" className="ui-form-control">{services.map(s => <option key={s}>{s}</option>)}</select></div>
    <div className="ui-form-group ui-form-builder-field-4"><label htmlFor="contact-message">{isPro ? "Vaše zpráva" : "Zpráva"}</label><textarea id="contact-message" name="message" className="ui-form-control" maxLength={1800} minLength={5} placeholder={isPro ? undefined : "Popište záměr, lokalitu, předpokládaný výkon..."} /></div>
    {!isPro && <div className="ui-form-group consent-field"><label><input type="checkbox" name="consent" required /> Souhlasím se zpracováním osobních údajů pro účely zpětného kontaktu.</label></div>}
    {isPro && <div className="ui-form-group verification-field"><label className="ui-form-label-visually-hidden" htmlFor="contact-answer">{challenge?.question || "Načítání ověření…"} (Ověření proti spamu)</label><input id="contact-answer" name="answer" className="ui-form-control" inputMode="numeric" required autoComplete="off" placeholder={`${challenge?.question || "Načítání ověření…"} (Ověření proti spamu)`} /></div>}
    <div className={`form-actions ${isPro ? "ui-form-builder-btn" : ""}`}><button id={isPro ? "kontakt-adresa-button-6" : undefined} className="button button-custom button-rounded" type="submit" disabled={status === "sending" || !challenge}>{status === "sending" ? "Odesílání…" : isPro ? "Odeslat" : "Odeslat e-mail"}{isPro ? <Icon name="arrow" /> : <span className="fa fa-paper-plane" aria-hidden="true" style={{ marginLeft: 5 }} />}</button></div>
    {message && <p className={`form-message ${status}`} role={status === "error" ? "alert" : "status"}>{message}{status === "error" && <> Můžete nám napsat na <a href={`mailto:${site.email}`}>{site.email}</a>.</>}</p>}
    <noscript><p>Pro odeslání formuláře zapněte JavaScript, nebo napište na <a href={`mailto:${site.email}`}>{site.email}</a>.</p></noscript>
  </form></div></div>;
}
