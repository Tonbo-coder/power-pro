# Power Pro na Vercelu

Propojeno 3. 10. 2026.

- Vercel tým: `tonbo-coders-projects`
- Projekt: [power-pro](https://vercel.com/tonbo-coders-projects/power-pro)
- GitHub: [Tonbo-coder/power-pro](https://github.com/Tonbo-coder/power-pro)
- Adresa webu: [power-pro-sage.vercel.app](https://power-pro-sage.vercel.app)
- Produkční větev: `main`
- Framework: Next.js; Node.js: `24.x`; kořen projektu: kořen repozitáře
- Instalace: `npm ci`; sestavení: `npm run build`

Vercel používá Git integraci: push do `main` vytváří produkční nasazení, ostatní větve preview. Lokální adresář je propojený pomocí `.vercel/project.json`; tato složka a `.env.local` se necommitují. Po novém klonování lze propojení obnovit:

```powershell
vercel link --yes --project power-pro --scope tonbo-coders-projects
```

CLI může při propojení přepsat `.env.local`; před propojením si uchovejte vlastní lokální nastavení. Aktuální lokální náhled stále používá `CONTACT_MODE=preview`.

## Formulář

V prostředí Production a Preview jsou nastavené `CONTACT_MODE=smtp`, `CONTACT_ALLOWED_ORIGINS` a samostatný náhodný `CONTACT_SECRET` uložený jako Secret. Hodnota klíče se do repozitáře neukládá. Backend povoluje pouze přesné adresy z konfigurace a systémových proměnných `VERCEL_URL`, `VERCEL_BRANCH_URL` a `VERCEL_PROJECT_PRODUCTION_URL`.

Od 6. 10. 2026 je Production nakonfigurováno pro Resend SMTP s vlastním klíčem omezeným na `forms.power-pro.cz`, uloženým jako Sensitive `SMTP_PASSWORD`. Odesílatel je `Power Pro <web@forms.power-pro.cz>` a příjemce `CONTACT_TO=miloslav.koci@tkeko.eu`, což je cílová adresa původního přeposílání WEDOS schránky. Resend potvrdil doručení produkčního testu na tuto adresu. Preview SMTP údaje nemá. Příjemce nebo SMTP nastavení lze upravit v [serverových proměnných](https://vercel.com/tonbo-coders-projects/power-pro/settings/environment-variables); po změně proveďte nové nasazení a test doručení. Přístupové údaje nepatří do repozitáře.

## Vlastní doména

Domény `power-pro.cz` a `www.power-pro.cz` jsou od 3. 10. 2026 přidané k produkčnímu prostředí. Varianta `www` má trvalé přesměrování 308 na `power-pro.cz`. DNS zůstává u WEDOSu a webové záznamy již směřují na Vercel; obě adresy mají funkční HTTPS. Metadata a sitemap používají `https://power-pro.cz`.

Přesné webové a odesílací DNS, zachování Microsoft 365 pošty, SMTP konfigurace a výsledky produkčních testů obou webů jsou v [GO-LIVE.md](GO-LIVE.md). Kořenové poštovní MX/SPF a nastavení Microsoft 365 se při zapojení formulářů neměnily.

## Kontrola a ruční nasazení

```powershell
vercel project inspect power-pro --scope tonbo-coders-projects
vercel list power-pro --scope tonbo-coders-projects
vercel deploy --prod --scope tonbo-coders-projects
```

Běžné změny stačí commitnout a pushnout. Chráněná preview ověřujte přes `vercel curl`; ochranu kvůli testování nevypínejte.
