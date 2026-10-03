# Jak upravovat web přes AI

Požádejte AI nejdříve o přečtení `PRODUCT.md`, `DESIGN.md` a tohoto souboru. Výchozím pravidlem je zachovat vzhled a animace. Není potřeba znovu stahovat původní web.

## Kde co najdete

| Změna | Soubor |
| --- | --- |
| Text, obrázek, odkaz nebo pořadí sekce | `content/pages/<klíč>.tsx` |
| Adresa, titulek, SEO popis | `content/pages.json` |
| Navigace, logo, hlavní kontaktní údaje | `content/site.json` |
| Obsah patičky | `components/Footer.tsx` |
| Formulář a jeho názvy polí | `components/ContactForm.tsx` |
| Kontrola a odesílání zpráv | `lib/contact.mjs`, `app/api/contact/route.ts` |
| Vzhled konkrétní stránky | `public/styles/pages/<klíč>.css` |
| Společné drobné úpravy a přístupnost | `public/styles/refinements.css` |
| Zachovaný základ původního designu | `public/styles/base.css` |
| Vlastní obrázky, videa, dokumenty | `public/files/`, `public/images/`, `public/media/` |

Klíč stránky najdete podle URL v `content/pages.json`. Například `/` používá `home.tsx`, `/kontakt` používá `kontakt.tsx`, podstránky používají v názvu dvě podtržítka. `content/registry.ts` propojuje obsah s routami.

Kontakty vložené do textu či patičky jsou záměrně součástí příslušné stránky. Při změně telefonu nebo e-mailu vyhledejte starou hodnotu v celém `content/` a `components/`, aby se změnila všechna použití včetně `tel:`/`mailto:`.

Adresa firmy a souřadnice kontaktní mapy jsou v `content/site.json` v objektu `address`. Změna se promítne do patičky, kontaktů, značky a bubliny v mapě i odkazu „Otevřít mapu“.

Okno s podcastem na úvodu používá `content/podcast.json`: text, Spotify odkaz, přepínač `enabled`, prodlevu `delayMs` a četnost `cooldownDays`. Výchozí prodleva je 5 sekund a další automatické zobrazení nejdříve za 7 dní; volba se pamatuje v prohlížeči. Změnou `id` lze oznámit nový podcast i návštěvníkům, kteří předchozí pozvánku už viděli. Komponenta a její vzhled jsou v `components/PodcastPopup.tsx` a `components/PodcastPopup.module.css`.

Článek o měření větru pro NOHO je na `/aktuality/mereni-vetru-noho`. Jeho nadpis, perex, odstavce, odkaz na partnera a fotografie jsou v `content/articles/noho-mereni-vetru.json`. První dlaždice v `content/pages/aktuality.tsx` používá tentýž nadpis a zkrácený perex. Rozvržení článku je v `content/pages/aktuality__mereni-vetru-noho.tsx`, stránkové CSS v `public/styles/pages/aktuality__mereni-vetru-noho.css`. SEO údaje jsou v `content/pages.json`; registrace stránky automaticky přidá adresu také do sitemap.

## Příklady zadání

> Na úvodu změň tento odstavec: „…“ na „…“. Zachovej rozvržení, velikosti písma a animace. Uprav pouze čitelný zdroj v content/pages/home.tsx a ověř mobilní náhled.

> Nahraď fotografii ve druhé sekci souborem public/files/moje-fotografie.webp. Zachovej poměr stran a pozici; doplň výstižný alternativní text.

> Přidej podstránku podle existujícího typu stránky. Zaregistruj ji v content/pages.json a content/registry.ts, použij jedinečné identifikátory a vlastní CSS omezené na data-page. Přidej odkaz do navigace, pokud je součástí zadání. Nevymýšlej reference ani produktové parametry.

## Pravidla pro změny

- Měňte přímo TSX/JSON. Obsah v `migration/source` je pouze historická reference a běžící web ho nečte.
- Textové uzly v TSX jsou často zapsané jako `{"Text"}`. Změňte text uvnitř řetězce; zachovejte uvozovky a závorky.
- Názvy souborů v `public/` se v odkazech zapisují bez `public`, např. `/files/fotografie.webp`.
- Zachovejte existující veřejné adresy a kotvy. Změna ID může rozbít odkaz z navigace i selektor v CSS.
- CSS jednotlivých stránek má prefix `[data-page="klíč"]`, takže změna neovlivní jiné stránky. Preferujte malou úpravu konkrétního pravidla před přidáváním dalších přepisů.
- Stávající media soubory, autentické texty a parametry jsou autoritou. Migrační skripty nejsou editor obsahu a jejich opakované spuštění přepíše ruční změny.
- Po změně spusťte `npm run typecheck` a `npm run build`, při úpravě formuláře také `npm test` a `npm run test:integration`. V prohlížeči zkontrolujte změněnou stránku na počítači i mobilu.

Oba projekty jsou nezávislé. Změna společné komponenty v jednom projektu se automaticky nepřenese do druhého. Formulářový endpoint vyžaduje Node hosting; při nasazení postupujte podle README.
