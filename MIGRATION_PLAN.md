# Plán migrace Power Pro a Powerdrive do Next.js

Datum: 27. 9. 2026. Zadání: zachovat vzhled současných webů; zjednodušit budoucí úpravy přes AI. Výstup: dva samostatné projekty a lokální náhledy.

## 1. Inventura a archiv před implementací

- Projít navigaci, vnořené stránky, odkazy z obsahu a případné články.
- Stáhnout zdrojové HTML jako referenci, CSS pro analýzu, loga, obrázky, videa, fonty a PDF. Zapsat původ každého souboru.
- Zaznamenat titulky, popisy, kanonické URL, kotvy, formuláře, galerie, nabídky a externí vložené prvky.
- Zachytit reprezentativní desktopové a mobilní snímky, rozměry kontejnerů, písma, barvy a průběh animací.
- Prověřit prázdné či nefunkční stránky a staré odkazy; zachovat platné adresy, zjevné vady opravit.

## 2. Architektura

- Dva nezávislé Next.js App Router projekty v Power-pro-web a Powerdrive-web; TypeScript, lokální assety a lockfile.
- Čitelné datové soubory v content/ pro texty, navigaci, produkty, služby a metadata; sémantické React komponenty v components/.
- Společná hlavička, patička, tlačítka, navigace, kontaktní formulář a komponenty animací uvnitř každého projektu. Žádný běhový Joomla, SP Page Builder ani jQuery.
- Generovat veřejné stránky předem, oddělit malé interaktivní části do klientských komponent. Zachovat existující cesty i kotvy.
- Barvy, šířky, písma a rozestupy v přehledném CSS. Zachovat prokazatelné vizuální odlišnosti jednotlivých sekcí.

## 3. Power Pro

- Úvod: video, původní nadpis a CTA, tři oblasti zaměření, představení a pět kroků spolupráce, kontaktní výzva.
- Větrné elektrárny, realizace měření větru včetně animované vizualizace a všech technických PDF, fakta o větrných elektrárnách.
- Zelený vodík, druhy vodíku a co umíme.
- Bateriová úložiště, aktuality a dohledané články, proč s námi, kontakt a mapa.
- Zachovat původní navigaci a její rozbalovací/mobilní variantu.

## 4. Powerdrive

- Úvod s fotografií a světlým panelem, čísla, kroky realizace, realizace, reference, loga partnerů, produkty, kontakt.
- Co děláme, všechny realizace a katalog produktů včetně kategorií a kotev AC/DC/příslušenství; další stránky dle inventury.
- Zachovat původní animace při scrollování, případné galerie, produktové detaily a průběh navigace.

## 5. Funkce a technická kvalita

- Menu: klávesnice, Escape, fokus, rozbalování, zavření po navigaci a dostatečné dotykové plochy.
- Animace: stejné efekty, časování a posloupnost; použít IntersectionObserver/CSS, podporovat prefers-reduced-motion a viditelný obsah bez JS.
- Formulář: validace na klientu i serveru, stav odesílání/chyby/úspěchu, ochrana proti robotům, omezení požadavků, SMTP konfigurace přes .env. Testování bez posílání reálných zpráv.
- Lokální fonty a média, rozměry obrázků, lazy loading pod přehybem, vhodné načtení hlavního média.
- Původní metadata, sitemap.xml, robots.txt, vlastní 404; opravit chybná mailto/tel a neplatné interní odkazy.

## 6. Ověření

- TypeScript, produkční build obou projektů a testy podstatných interakcí/formulářového API.
- Kontrola všech tras, odkazů, kotev a lokálních souborů proti inventuře.
- Dávkové vizuální porovnání desktopu a mobilu s originálem, kontrola přetečení a otevřeného menu. Jedna souhrnná oprava a potvrzovací průchod.
- Nezávislá závěrečná kontrola dle použité dovednosti Impeccable; řešit konkrétní nalezené vady.

## 7. Předání

- Spustit lokální náhledy na různých portech.
- České README: spuštění, struktura obsahu, typické AI úpravy, proměnné prostředí, build, nasazení a rozdíly vůči původnímu webu.
- Přiložit inventuru, původ médií, výsledky ověření a případná skutečná omezení. Produkční weby zůstanou nedotčené.

## Kritéria dokončení

Oba projekty se sestaví, obsahují dohledaný veřejný obsah a lokální média, zachovávají vzhled a animace, mají použitelné mobilní zobrazení, ověřené hlavní funkce a dokumentované nasazení. SMTP bez dodaných údajů zůstává explicitním krokem při nasazení, nikoli předstíraně funkčním odesíláním.
