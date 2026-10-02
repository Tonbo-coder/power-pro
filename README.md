# Power Pro — Next.js

Samostatný web převedený z [power-pro.cz](https://power-pro.cz/). Zachovává původní vzhled, veřejné adresy, obsah, fotografie, videa a animace. Obsah je uložený v projektu; Joomla ani databáze nejsou potřeba. Projekt obsahuje 12 veřejných stránek včetně poděkování.

## Spuštění lokálního náhledu

Použijte Node.js 22 nebo novější (ověřeno na Node.js 24). V adresáři projektu:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Soubor `.env.local` už je pro zdejší náhled připravený. Pokud v něm máte vlastní údaje, nekopírujte ho znovu. Náhled: **http://127.0.0.1:3000**. Powerdrive běží samostatně na portu 3001. Ukončení serveru: Ctrl+C v jeho terminálu.

## Úpravy přes AI

Začněte souborem [EDITING.md](EDITING.md). Texty a struktura jednotlivých stránek jsou v `content/pages/*.tsx`, titulky a adresy v `content/pages.json`, navigace a základní kontakty v `content/site.json`. TSX je čitelný React/HTML obsah členěný podle sekcí; nejde o HTML načítané z původního serveru ani o uzavřený editor.

Vzhled popisuje [DESIGN.md](DESIGN.md), zadání [PRODUCT.md](PRODUCT.md) a původní postup [MIGRATION_PLAN.md](MIGRATION_PLAN.md). Při změně textu není potřeba zasahovat do routování nebo formulářového backendu.

## Kontroly a produkční běh

```powershell
npm run typecheck
npm test
npm run build
npm run test:integration
npm start
```

Integrační test spouští vlastní dočasný produkční server a místní SMTP přijímač. E-mail neposílá na internet. `npm start` používá port 3000; nejprve ukončete vývojový server na stejném portu. Po změně obsahu je pro produkční běh potřeba nový build.

## Formulář a SMTP

V `npm run dev` s `CONTACT_MODE=preview` formulář provede validaci a zobrazí výslovné potvrzení testu, bez odeslání e-mailu. Produkční běh tento testovací režim nepovoluje. Bez SMTP nastavení vrátí srozumitelnou chybu; neukáže falešné úspěšné odeslání.

Pro ostrý provoz nastavte v prostředí hostingu:

| Proměnná | Význam |
| --- | --- |
| `CONTACT_MODE` | `smtp` |
| `CONTACT_SECRET` | Náhodný tajný řetězec alespoň 32 znaků, stejný pro všechny instance |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` | Údaje dodané poskytovatelem e-mailu |
| `SMTP_PORT`, `SMTP_SECURE` | Typicky `465` / `true`, případně `587` / `false` pro STARTTLS |
| `CONTACT_FROM` | Ověřená adresa odesílatele; výchozí je SMTP_USER |
| `CONTACT_TO` | Příjemce; výchozí je `info@power-pro.cz` |
| `CONTACT_ALLOWED_ORIGINS` | Další povolené adresy oddělené čárkou; hlavní doména z `content/site.json` je povolená automaticky |

Hesla patří pouze do `.env.local` nebo prostředí hostingu. Odpověď na e-mail míří na návštěvníka pomocí Reply-To; návštěvník nemůže určovat adresáta zprávy. Server ověřuje typy a délky polí, podpis a stáří ověření, původ požadavku, honeypot a omezuje opakované požadavky. Limit je společný v rámci jednoho procesu; při více instancích doplňte společný limit na hostingu.

## Nasazení

Projekt je propojený s Vercel týmem `tonbo-coders-projects` a repozitářem `Tonbo-coder/power-pro`. Adresa na Vercelu je [power-pro-sage.vercel.app](https://power-pro-sage.vercel.app). Push do `main` spustí produkční nasazení; ostatní větve dostávají preview. Nastavení a zbývající kroky pro doménu a e-mail popisuje [DEPLOYMENT.md](DEPLOYMENT.md).

Použijte hosting podporující Next.js/Node.js (nebo vlastní Node server za HTTPS proxy). Čistě PHP hosting bez Node aplikací neumí spustit tento formulářový endpoint. Nasazují se dva nezávislé projekty; každý má vlastní doménu a SMTP nastavení. Standardní postup je `npm ci`, `npm run build`, `npm start`. Pro jiný port použijte `npx next start --hostname 127.0.0.1 --port 3100`; veřejný HTTPS provoz směrujte přes proxy hostingu.

Stránky se generují při buildu. Sitemap a robots jsou dostupné na `/sitemap.xml` a `/robots.txt`; poděkování se neindexuje. Původní URL zůstaly zachované. Přepnutí domény `power-pro.cz` se řeší samostatně po nastavení e-mailu.

## Co bylo zachováno a opraveno

- Lokální kopie původních obrázků, fontů, videí a PDF; shodné sekce, texty a kotvy.
- Původní nástupní animace a video, navíc ovládání pauzy a respektování omezeného pohybu v systému.
- Mobilní navigace, obsluha klávesnicí, galerie, viditelný fokus a srozumitelné chyby formuláře.
- Kontaktní mapa používá původní šedý podklad Esri a značku. Mapové dlaždice a vložená videa YouTube vyžadují internet; vlastní média webu jsou lokální.
- Opravené neplatné odkazy, neplatné znaky CSS a čitelnější kontakty v patičce. U poděkování odstraněny odkazy CSS na dvě fotografie, které nebyly dostupné ani na původním webu.

Archiv `migration/` obsahuje původní HTML, inventuru, původ médií a ověřovací zprávy. Není součástí běhové aplikace. Importéry jsou jednorázové migrační nástroje: **znovu je nespouštějte na upraveném obsahu**. Referenční snímky jsou v `migration/reference/`, závěrečné lokální snímky a recenze v `.impeccable/review/`.
