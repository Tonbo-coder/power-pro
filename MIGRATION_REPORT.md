# Výsledek migrace

Ověřeno 27. 9. 2026. Dva samostatné projekty Next.js 16.3.6 / React 19.3.0, lokální výstup bez nasazení.

| Kontrola | Výsledek |
| --- | --- |
| Power Pro | 12 stránek, všechny HTTP 200 |
| Powerdrive | 25 stránek, všechny HTTP 200 |
| Obsah | Shodné nadpisy a pořadí všech původních sekcí na všech 37 stránkách |
| Lokální odkazy, kotvy, CSS/média | Bez chybějících cílů v automatické kontrole |
| Neexistující adresa | HTTP 404 u obou projektů |
| Produkční sestavení a TypeScript | Oba projekty prošly |
| Testy formuláře | 5 jednotkových + 8 integračních kontrol na každý projekt |
| SMTP | Ověřeno přes místní testovací server, bez odeslání na internet |
| npm audit produkčních závislostí | 0 známých zranitelností k datu ověření |
| Vizuální porovnání | Úvody obou webů, kontakt Power Pro, produktový detail Powerdrive: šířky 1440 a 390 px |

V prohlížeči ověřeno mobilní menu a vnořené položky, zavření Escape a návrat fokusu, galerie s posunem a návratem na fotografii, formulář v lokálním režimu, pauza videa a režim omezeného pohybu. Fotografie, videa, fonty, PDF a ostatní převzaté soubory jsou v `public/`; původ a SHA-256 každého souboru zaznamenává `migration/asset-manifest.json`.

Závěrečná nezávislá recenze podle Impeccable měla čtyři připomínky: chybějící divové sekce/mapu, rozložení kontaktního formuláře, rok v patičce a sjednocení nových ovládacích ikon. Všechny byly opraveny; verdict **ship** se vztahuje k těmto čtyřem bodům a obnoveným snímkům. Specializovaná role nebyla dostupná, takže kontrolu podle stejného postupu provedl samostatný agent bez zděděné historie. Nejde o tvrzení pixelové shody každé stránky na každém zařízení.

## Před ostrým nasazením

Uživatel požadoval dokončené projekty a lokální náhledy. Pro živý provoz je potřeba zvolit Node/Next.js hosting, zadat SMTP a CONTACT_SECRET, provést skutečný doručovací test na vlastní adresu a teprve poté přepnout domény. Vzdálené Joomla weby zůstaly nedotčené.

Původní obsah byl zachován včetně stránky Powerdrive `/nase-realizace`, která oznamuje přípravu obsahu. Nevznikly nové reference ani domyšlené produktové parametry. Mapa a vložená videa používají externí služby stejně jako původní web; lokálně uložená média fungují nezávisle na Joomla hostingu.

## Reprodukce ověření

V každém projektu: `npm run typecheck`, `npm test`, `npm run build`, `npm run test:integration`. Výstup API testu je v `migration/contact-integration.json`.

Souhrnná kontrola obou webů se spouští z projektu Power Pro, za běžících náhledů na portech 3000 a 3001: `node migration/verify.mjs`. Používá pomocné závislosti z `migration/package.json` (při nové instalaci: `npm ci --prefix migration`). Zapisuje do `migration/verification.json` v obou projektech. Migrační importéry se pro běžné úpravy nespouštějí.

Snímky původního webu: `migration/reference/`. Nové snímky a recenze: `.impeccable/review/`. Dokumentace úprav: `EDITING.md`, pravidla zachovaného vzhledu: `DESIGN.md`.

## Doplněk: Vercel, 3. 10. 2026

Oba GitHub repozitáře byly propojené s vlastními projekty ve Vercel týmu `tonbo-coders-projects`. Nastavení je v `DEPLOYMENT.md`. Pro Vercel byly doplněné přesné povolené adresy formuláře a samostatné tajné podpisové klíče. Po této změně oba projekty prošly sestavením, TypeScriptem, 6 jednotkovými a 9 integračními kontrolami. SMTP údaje a přepnutí původních domén zůstávají samostatnými kroky.
