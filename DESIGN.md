---
name: Power Pro
description: "Věrné zachování původního webu Power Pro při migraci z Joomla do Next.js."
colors:
  brand-700: "#424B54"
  brand-600: "#58626D"
  accent-500: "#6B86A1"
  accent-600: "#556F89"
  button-solid: "#434c55"
  button-hover: "#57616c"
  white: "#FFFFFF"
  bg-50: "#F4F6F8"
  feature-surface: "#f8f9fa"
  feature-border: "#eee"
  feature-text: "#666"
  footer: "#171717"
  footer-readable: "#adb5bd"
  outline-hover-text: "#252525"
  focus: "#6ea6e7"
  field-text: "RGBA(66, 75, 84, 0.8)"
typography:
  display:
    fontFamily: "Hind, sans-serif"
    fontSize: "clamp(40px, 4.2vw, 72px)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hind, sans-serif"
    fontSize: "clamp(30px, 3.0vw, 48px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  feature-title:
    fontFamily: "Hind, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "30px"
    letterSpacing: "1px"
  body:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  feature-body:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: "16px"
    lineHeight: "26px"
  hero-action:
    fontFamily: "Hind, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.25
  field:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: "14px"
    lineHeight: 1.25
  field-label:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: "13px"
  navigation:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: "14px"
    lineHeight: "100px"
rounded:
  square: "0px"
  control: "4px"
  feature: "15px"
spacing:
  gutter: "15px"
  feature-inline: "30px"
  feature-block: "50px"
  field-inset: "4px"
  hero-block: "200px"
components:
  button-hero:
    backgroundColor: "{colors.button-solid}"
    textColor: "{colors.white}"
    typography: "{typography.hero-action}"
    rounded: "{rounded.control}"
    padding: "11px 30px"
  button-hero-hover:
    backgroundColor: "{colors.button-hover}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.hero-action}"
    rounded: "{rounded.control}"
    padding: "11px 30px"
  button-outline-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.outline-hover-text}"
  button-submit:
    backgroundColor: "{colors.button-solid}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 28px"
  input-contact:
    backgroundColor: "{colors.white}"
    textColor: "{colors.field-text}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "{spacing.field-inset}"
  feature-card:
    backgroundColor: "{colors.feature-surface}"
    textColor: "{colors.feature-text}"
    rounded: "{rounded.feature}"
    padding: "50px 30px"
---

# Design System: Power Pro

## Overview

**Creative North Star: "Původní Power Pro"**

Vizuální autoritou je původní firemní web zachycený v `migration/source/` a `migration/reference/`. Název výše je popis této autority, nikoli nová kreativní koncepce. Závazek v `PRODUCT.md` požaduje zachování loga, médií, typografie, rozvržení a animací; změna technologie nemá změnit dojem návštěvníka.

Dokument popisuje implementaci k 27. 9. 2026. Normativní hodnoty jsou ve frontmatteru; konkrétní stránkové výjimky zůstávají ve svém CSS. Důkazy: `public/styles/base.css`, `public/styles/refinements.css`, `public/styles/pages/home.css`, `public/styles/pages/kontakt.css`, `content/pages/` a `components/`. Původní snímky jsou `migration/reference/desktop.png` a `mobile.png`; lokální kontrolní snímky leží v `.impeccable/review/`. Dokumentace sama není potvrzením pixelové shody.

**Key Characteristics:**

- Tlumená šedomodrá, světlé obsahové plochy a tmavá patička.
- Video větrné elektrárny, původní fotografie a jednoduché obrysové ilustrace.
- Hind v hlavních nadpisech a CTA; zachovaná systémová sazba v nepřepsaných částech.
- Průhledná hlavička přes úvodní médium, měkce zaoblené karty a původní nástupové animace.

## Colors

### Primary

`brand-700` určuje nadpisy a tmavé prvky; `brand-600` běžný text. `accent-500` a `accent-600` jsou odkazy a jejich hover. Plné CTA mají vlastní mírně odlišné odstíny `button-solid` a `button-hover`; neslévat je do jedné barvy.

### Neutral

Bílá zůstává základním pozadím a inverzním textem. `bg-50` odděluje světlé sekce, `feature-surface` a `feature-border` vymezují karty zaměření. Patička používá `footer`; `footer-readable` je drobná oprava čitelnosti kontaktních údajů a odkazů v aktuální implementaci.

Zlatá uvnitř původního patičkového loga patří k dodanému obrazovému souboru. Není novým obecným akcentem UI. Modré `focus` označuje přístupný fokus ovládacích prvků.

**The Original Palette Rule.** Používat převzaté barvy v jejich původních rolích; nesjednocovat paletu s Powerdrive.

## Typography

Hind je lokálně uložen v `public/media/com_sppagebuilder/assets/google-fonts/Hind/`. Je výslovně přiřazen hlavním nadpisům, kartovým titulkům, CTA a vybraným textovým blokům. Základní `body` i některé menší nadpisy a patičkové prvky dědí systémovou sans-serif sazbu. Neaplikovat Hind plošně jen kvůli sjednocení.

Hlavní hierarchii popisují `display`, `headline` a `feature-title`. Pozdější společné pravidlo nadpisů nastavuje řádkování 1.25; původní deklarované clamp řádkování je v kaskádě přepsáno. Tlačítka v hero přecházejí na 14px pod 992px. Text karet zaměření používá `feature-body`, jiný úvodní popis sekce je Hind 17px/22px. Formulář má menší popisky podle `field-label`.

**The Local Typography Rule.** Zachovat explicitní sazbu jednotlivých bloků i skutečné dědění; nepřevádět celý web na jediný globální typografický předpis.

## Layout

Hlavička i obsah používají vycentrované kontejnery s bočním odsazením `gutter`. Šířky kontejnerů jsou 540px od 576px, 720px od 768px, 960px od 992px, 1140px od 1200px a 1320px od 1400px. Stránkové breakpointy používají odpovídající horní meze s .98px.

Úvodní sekce zasahuje pod průhlednou hlavičku pomocí původního horního posunu −100px; má výrazné svislé odsazení `hero-block`. Hlavička je na desktopu vysoká 100px, pod 992px 50px. Logo má na desktopu výšku 90px, na mobilu 36px.

Tři karty zaměření tvoří třetiny řádku; pod 768px se skládají pod sebe. Jejich svislé odsazení se mění z `feature-block` na 30px. Původní pětikroková spolupráce, rozestupy sekcí a patičkové sloupce zůstávají řízené stránkovými styly. Formulář zachovává dvojici jméno/e-mail v půlkách a další pole přes celou šířku.

## Elevation & Depth

Hlavička nemá stín. Hloubku vytvářejí převážně médium přes celou šířku, barevně odlišené sekce, jemné okraje karet a překrytí videa. Úvodní bílý nadpis má textový stín `2px 4px 4px rgba(0,0,0,0.3)`; přes video leží radiální ztmavení od průhledné po poloprůhlednou černou.

Karty zaměření mají nepatrný okrajový stín `0px 0px 0px 0.08px #eee` a 3px rámeček. V základním CSS existují také proměnné `--shadow-1` až `--shadow-3`; jejich existence neznamená, že se mají přidat na všechny karty. Nepřidávat stíny nad rámec konkrétního převzatého komponentu.

## Shapes

Tlačítka používají malé zaoblení `control`, karty zaměření větší `feature`. Podtržená kontaktní pole mají rovné rohy a pouze spodní linku. Sekce a fotografie nemají jednotně vnucené zaoblení; zachovat jejich místní masky a rohy.

## Components

### Buttons

Hero obsahuje plné tlačítko „Jak to funguje?“ a průhledné „Nezávazná konzultace“ s bílým rámečkem. Druhé se při hoveru vyplní bíle a ztmaví text. Základní přechod tlačítka je 150ms ease-in-out. Odesílací tlačítko používá původní rozměry a pravou SVG šipku; pod 768px se jeho odsazení mění na 10px 15px. Viditelný fokus je 3px s odsazením 4px.

### Cards / Containers

Karty zaměření nesou původní obrysové obrázky, vystředěný titulek a popis. Obrázek se při hoveru zvětšuje na 1.02 během 500ms; textové odkazy se podtrhují. Obrazové soubory nejsou generické ikony určené k výměně. Pět kroků spolupráce má vlastní převzaté rozvržení a nesmí automaticky zdědit vzhled těchto tří karet.

### Inputs / Fields

Kontaktní formulář je původní varianta s popisky, spodní linkou a `field-inset`; nejde o zaoblenou formulářovou variantu Powerdrive. Textarea má výšku 100px. Pořadí je jméno, e-mail, předmět, požadovaná služba, zpráva a číselné ověření. Pole mají výslovný viditelný klávesnicový fokus (3px modrá linka s odsazením 4px). Stav odesílání a zprávy výsledku přidává React komponenta při zachování vizuálního okolí.

### Navigation

Bílé desktopové odkazy leží nad médiem; hlavní rozbalovací nabídka je široká 240px, bez stínu a s původním posunem. Hover i fokus zpřístupňují podnabídku. Mobilní menu je dialog zprava, široký nejvýše 360px nebo 90vw, s tmavým pozadím, odsazením 32px 24px a tlačítkem zavření. Podnabídky jsou rozbalitelné; Escape a návrat fokusu zajišťuje komponenta.

### Media, motion and map

Původní úvodní video `/media/videos/2025/11/19/857010-hd_1920_1080_30fps.mp4` se přehrává bez zvuku, ve smyčce, s ořezem cover. Je doplněno SVG ovladačem přehrávání. Fotografie, video a loga z lokálního archivu ponechat v jejich původní roli.

Scroll animace používají původní třídy fade/zoom a hodnoty `data-motion-duration` / `data-motion-delay`; výchozí délka bez vlastní hodnoty je 700ms. Obsah je bez JavaScriptu viditelný. Omezený pohyb zastaví video a potlačí nástupy.

Kontaktní mapa zachovává šedé Esri Canvas dlaždice, původní střed a značku `/images/map/map-pin.svg` o rozměru 38×95px. Výška je 640px, pod 1200px 500px a pod 768px 250px. Dlaždice vyžadují připojení; nejde o statický obrázek. SVG ovladače galerie a videa přebírají `currentColor`.

## Do's and Don'ts

### Do:

- **Do** porovnávat změny s archivovanými původními snímky na desktopu i telefonu.
- **Do** zachovat původní loga, fotografie, video, mapový marker a proporce médií.
- **Do** respektovat stránkové výjimky, pořadí CSS a skutečné dědění fontů.
- **Do** zachovat přístupný fokus, ovládání klávesnicí a omezený pohyb.

### Don't:

- **Don't** zavádět nový vizuální směr ani sjednocovat Power Pro s Powerdrive.
- **Don't** nahrazovat převzaté podtržené formulářové pole za zaoblené pole druhého webu.
- **Don't** používat archivované vady, chybějící obrázky nebo historické přetečení jako vzor pro nové prvky.
- **Don't** vytvářet nové marketingové sliby, syntetické barevné řady nebo nové ilustrační materiály.

