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

Pro skutečné doručení doplňte `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_PORT`, `SMTP_SECURE` a případně `CONTACT_FROM`/`CONTACT_TO` v [nastavení proměnných](https://vercel.com/tonbo-coders-projects/power-pro/settings/environment-variables). Po změně proměnných proveďte nové nasazení. Bez SMTP formulář vrací výslovnou chybu konfigurace.

## Vlastní doména

Domény `power-pro.cz` a `www.power-pro.cz` jsou od 3. 10. 2026 přidané k produkčnímu prostředí. Varianta `www` má trvalé přesměrování 308 na `power-pro.cz`. DNS zůstává u WEDOSu a zatím směruje na původní web; HTTPS certifikáty Vercel vystaví po správném nasměrování DNS. Metadata a sitemap již používají `https://power-pro.cz`.

Přesné změny DNS, zachování Microsoft 365 pošty, zapojení SMTP a pořadí ostrého spuštění obou webů jsou v [GO-LIVE.md](GO-LIVE.md). Před přepnutím ověřte skutečné doručení formuláře; SMTP přístupové údaje zatím chybí.

## Kontrola a ruční nasazení

```powershell
vercel project inspect power-pro --scope tonbo-coders-projects
vercel list power-pro --scope tonbo-coders-projects
vercel deploy --prod --scope tonbo-coders-projects
```

Běžné změny stačí commitnout a pushnout. Chráněná preview ověřujte přes `vercel curl`; ochranu kvůli testování nevypínejte.
