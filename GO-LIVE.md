# Ostré spuštění Power Pro a Powerdrive

Stav ověřen 3. 10. 2026. DNS hodnoty níže pocházejí z nastavení konkrétních projektů Vercelu, nikoli z obecného příkladu.

## Co je připravené

| Web | Projekt Vercelu | Produkční doména | Přesměrování |
| --- | --- | --- | --- |
| Power Pro | [power-pro](https://vercel.com/tonbo-coders-projects/power-pro/settings/domains) | `power-pro.cz` | `www.power-pro.cz` → `power-pro.cz`, HTTP 308 |
| Powerdrive | [powerdrive](https://vercel.com/tonbo-coders-projects/powerdrive/settings/domains) | `powerdrive.cz` | `www.powerdrive.cz` → `powerdrive.cz`, HTTP 308 |

Všechny čtyři domény jsou přidané a vlastnictví je ve Vercelu ověřené. Oba projekty mají funkční produkční nasazení a Git integraci s větví `main`. Domény zatím směřují na původní hosting; WEDOS DNS nebylo změněno. Stav „Invalid Configuration“ ve Vercelu nyní znamená právě čekání na změnu DNS. Vercel vystaví HTTPS certifikáty po rozšíření správných DNS záznamů. [Dokumentace Vercelu](https://vercel.com/docs/domains/working-with-ssl).

Formuláře zatím nemohou doručovat zprávy: v Production nejsou nastavené SMTP přístupové údaje. Nejprve je zapojte a ověřte na současných adresách [Power Pro](https://power-pro-sage.vercel.app) a [Powerdrive](https://powerdrive-lemon.vercel.app), potom přepněte DNS.

## DNS změny ve WEDOSu

V zákaznickém centru otevřete DNS → příslušná doména → záznamy domény. Před úpravou si uložte export nebo snímek tabulky. Pro hlavní doménu nechte pole **název prázdné**; znak `@` používaný Vercel dokumentací do tohoto pole nezapisujte. Pro subdoménu zadejte pouze `www`. [Manuál WEDOS DNS](https://kb.vedos.cz/dns-manual/).

Proveďte pouze tyto změny, TTL nastavte na **300**:

| Doména | Název ve WEDOSu | Typ | Akce / data |
| --- | --- | --- | --- |
| `power-pro.cz` | prázdné | A | Změnit `46.28.106.153` na **`216.150.1.1`** |
| `power-pro.cz` | prázdné | AAAA | Smazat původní **`2a02:2b88:1:4::c1`** |
| `power-pro.cz` | `www` | CNAME | Přidat **`86df76688504abc7.vercel-dns-016.com.`** |
| `powerdrive.cz` | prázdné | A | Změnit `185.8.237.11` na **`216.150.1.1`** |
| `powerdrive.cz` | prázdné | AAAA | Smazat původní **`2a0e:acc0::c11`** |
| `powerdrive.cz` | `www` | CNAME | Přidat **`2170c47c9532086d.vercel-dns-016.com.`** |

U CNAME kopírujte celou hodnotu včetně tečky na konci, bez `https://`. V dodaných snímcích samostatné záznamy `www` nejsou: dědí původní záznamy `*`. Nový explicitní CNAME toto dědění nahradí. Pokud mezitím vznikl samostatný A/AAAA záznam s názvem přesně `www`, odstraňte pouze tento kolidující záznam před přidáním CNAME. [CNAME ve WEDOSu](https://kb.vedos.cz/dns-alias-cname/).

Staré kořenové AAAA odstraňte, aby část návštěvníků přes IPv6 nezůstala na původním webu. Náhradní AAAA pro hlavní domény Vercel v tomto nastavení nedoporučuje. Nepřidávejte CNAME bez názvu na hlavní doménu: vedle jejích MX/TXT záznamů použijte uvedený A záznam. [Pravidla Vercelu pro externí DNS](https://vercel.com/docs/domains/troubleshooting).

Po úpravě každé domény klikněte **aplikovat změny** a potvrďte uložení. Nameservery a NSSET ponechte na WEDOSu. Záznamy `*` A/AAAA a `ftp` nechte také beze změny, aby zůstaly zachované ostatní subdomény a přístup k původnímu hostingu.

## Poštovní záznamy zachovat

Veřejné DNS i dodané snímky potvrzují příjem pošty přes Microsoft 365. Webové A/AAAA jsou od těchto MX záznamů oddělené. Následující záznamy **neupravujte ani nemažte**:

| Název / typ | Power Pro | Powerdrive |
| --- | --- | --- |
| prázdné / MX | priorita `0`, `powerpro-cz01c.mail.protection.outlook.com` | priorita `10`, `powerdrive-cz.mail.protection.outlook.com` |
| prázdné / TXT, Microsoft ověření | `MS=ms11502173` | `MS=ms39479162` |
| prázdné / TXT, SPF | `v=spf1 include:spf.protection.outlook.com -all` | stejná hodnota |
| `autodiscover` / CNAME | `autodiscover.outlook.com` | stejná hodnota |
| `key1.wedos-dkim._domainkey` / CNAME | `key1.dkim-we.wedos.net` | stejná hodnota |
| `key2.wedos-dkim._domainkey` / CNAME | `key2.dkim-we.wedos.net` | stejná hodnota |

Zachovejte také všechny případné další existující poštovní záznamy, např. Microsoft DKIM nebo DMARC, pokud je správce doplní. Běžné schránky ani nastavení Outlooku se kvůli přesunu webů nemění.

## Jak fungují nové kontaktní formuláře

Oba weby odesílají JSON na vlastní serverový endpoint `/api/contact` ve Vercelu. Ten provádí validaci a pomocí Nodemaileru odešle jednu textovou zprávu přes nastavený SMTP server. Výchozí příjemci jsou `info@power-pro.cz` a `info@powerdrive.cz`; lze je změnit proměnnou `CONTACT_TO`. Adresa návštěvníka je v `Reply-To`, takže tlačítko Odpovědět v poště míří přímo na něj. Odesílatel musí být ověřený u SMTP poskytovatele.

Web zprávy neukládá do databáze ani neposílá automatickou kopii návštěvníkovi. Úspěch potvrdí až po přijetí zprávy SMTP serverem; doručení do konkrétní složky schránky je třeba ověřit. Bez konfigurace vrací chybu 503 „Odesílání e-mailů zatím není nakonfigurováno.“ Produkční formulář nemůže předstírat úspěch v lokálním testovacím režimu.

V obou projektech jsou v Production a Preview připravené `CONTACT_MODE=smtp`, `CONTACT_ALLOWED_ORIGINS` a náhodný `CONTACT_SECRET` uložený jako Secret. Hlavní ostrá doména je povolená automaticky z `content/site.json`; přesměrování `www` vede na ni. Stávající `CONTACT_SECRET` a povolené adresy ponechte. Žádné SMTP heslo není v repozitáři.

## Doporučené zapojení: Resend přes SMTP

Resend zde slouží pouze pro odchozí zprávy formulářů. Příjem běžné pošty zůstane v Microsoft 365. Podporuje stávající SMTP kód bez úpravy aplikace. Samostatné odesílací subdomény oddělí nové záznamy od hlavních domén. [SMTP nastavení](https://resend.com/docs/send-with-smtp), [ověření subdomén](https://resend.com/docs/dashboard/domains/introduction).

1. V Resend založte nebo použijte vlastní účet a v **Domains → Add domain** přidejte `forms.power-pro.cz` a `forms.powerdrive.cz`. Zvolte pouze odesílání; příjem pošty (Receiving) nezapínejte. Pro běžný menší objem může stačit tarif Free: k datu kontroly zahrnuje 3 domény, 3 000 zpráv měsíčně a 100 denně; limity jsou společné pro celý účet. [Aktuální tarif](https://resend.com/pricing).
2. Do WEDOSu přidejte přesně DKIM, SPF a případný MX pro Return-Path, které Resend zobrazí pro tyto subdomény. Hodnoty závisejí na doméně a regionu, proto je nekopírujte z obecného příkladu. Názvy zadávejte relativně: například `resend._domainkey.forms` nebo `send.forms`, pokud takové celé názvy Resend skutečně zobrazí. Poštovní MX na **hlavní doméně** a její SPF ponechte. Nepřidávejte druhý SPF záznam na stejný název. Potvrďte „aplikovat změny“.
3. Počkejte, až obě subdomény v Resend ukážou **Verified**. V **API Keys → Create API Key** vytvořte pro každý projekt samostatný klíč s oprávněním **Sending access**, omezený na jeho odesílací subdoménu. [Omezení API klíčů](https://resend.com/changelog/new-api-key-permissions).
4. Ve Vercelu otevřete **Settings → Environment Variables**, zvolte prostředí **Production** a přidejte hodnoty podle následující tabulky. Heslo / API klíč uložte jako **Secret / Sensitive**, nikoli do souboru v repozitáři nebo do veřejné proměnné `NEXT_PUBLIC_*`.

Nastavení proměnných: [Power Pro](https://vercel.com/tonbo-coders-projects/power-pro/settings/environment-variables), [Powerdrive](https://vercel.com/tonbo-coders-projects/powerdrive/settings/environment-variables).

| Proměnná | Power Pro | Powerdrive |
| --- | --- | --- |
| `CONTACT_MODE` | `smtp` — již nastaveno | `smtp` — již nastaveno |
| `SMTP_HOST` | `smtp.resend.com` | `smtp.resend.com` |
| `SMTP_PORT` | `465` | `465` |
| `SMTP_SECURE` | `true` | `true` |
| `SMTP_USER` | `resend` | `resend` |
| `SMTP_PASSWORD` | API klíč pro `forms.power-pro.cz` | API klíč pro `forms.powerdrive.cz` |
| `CONTACT_FROM` | `Power Pro <web@forms.power-pro.cz>` | `Powerdrive <web@forms.powerdrive.cz>` |
| `CONTACT_TO` | `info@power-pro.cz` | `info@powerdrive.cz` |

Adresy `web@forms.…` jsou ověřené identity odesílatele; nemusíte pro ně zřizovat schránky. Odpovědi půjdou na adresu návštěvníka z formuláře díky `Reply-To`. Po uložení otevřete **Deployments → poslední produkční nasazení → Redeploy**. Změna proměnných se do již běžícího nasazení sama nepropíše. Pro testy na preview přidávejte SMTP údaje i do Preview jen tehdy, pokud má také skutečně odesílat e-maily.

Jestli už máte jiného SMTP poskytovatele, stejný backend funguje s jeho údaji; použijte jím předepsaný host, port, zabezpečení a ověřeného odesílatele.

### Varianta s existujícím Microsoft 365

Použít lze `smtp.office365.com`, port `587`, `SMTP_SECURE=false` (STARTTLS), jméno schránky jako `SMTP_USER` a její povolené přístupové údaje. Odesílatel musí odpovídat přihlášené schránce nebo mít oprávnění Send As. To ale závisí na nastavení Authenticated SMTP a bezpečnostních pravidlech konkrétního Microsoft tenant účtu; samotná existence MX neznamená, že přihlášení heslem funguje.

Současný backend podporuje SMTP jméno/heslo, nikoli OAuth. Kvůli formuláři nevypínejte bezpečnostní výchozí nastavení Microsoft 365. Pokud správce vyžaduje moderní ověření, zvolte uvedené samostatné SMTP nebo bude nutné doplnit OAuth / Microsoft Graph do kódu. Microsoft doporučuje moderní ověření a od heslového SMTP ustupuje. [Nastavení SMTP pro aplikace](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365), [Authenticated SMTP](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

## Pořadí spuštění a kontrola

1. Nastavte odesílací službu a proměnné, proveďte nové produkční nasazení obou projektů.
2. Na současných adresách `*.vercel.app` odešlete vlastní testovací zprávu z obou formulářů. Ověřte, že skutečně dorazí do správného `info@…`, zkontrolujte spam a ověřte, že Odpovědět míří na e-mail uvedený ve formuláři.
3. Teprve potom proveďte tabulku webových DNS změn. Nameservery i poštovní záznamy zachovejte.
4. V **Vercel → Settings → Domains** klikněte Refresh. Vyčkejte na **Valid Configuration** a HTTPS certifikát pro hlavní doménu i `www`. WEDOS uvádí obvyklé rozšíření změn do hodiny; TTL těchto webových záznamů je 300 sekund, ale nejde o záruku přesného času. [DNS manuál](https://kb.vedos.cz/dns-manual/).
5. Ověřte HTTPS na obou hlavních doménách, přesměrování `www`, kontakty, podstránky, obrázky, vložené přehrávače a formuláře znovu na ostrých doménách. Z externí schránky ověřte také příjem a odpověď běžné pošty v Microsoft 365.

Původní hosting zatím zachovejte pro případ návratu a kvůli případným ostatním subdoménám. Jeho zrušení řešte až po ověření webů a závislých služeb.

## Návrat na původní web při problému

U příslušné domény vraťte původní kořenový A a AAAA podle tabulky níže a odstraňte pouze nově přidaný `www` CNAME. `www` pak znovu využije zachovaný wildcard `*`. Potvrďte „aplikovat změny“; návrat také podléhá DNS cache. Poštovní záznamy zůstávají po celou dobu stejné.

| Doména | Původní A | Původní AAAA |
| --- | --- | --- |
| `power-pro.cz` | `46.28.106.153` | `2a02:2b88:1:4::c1` |
| `powerdrive.cz` | `185.8.237.11` | `2a0e:acc0::c11` |

Výchozí veřejné DNS záznamy byly ověřeny přes resolvery Cloudflare a Google; snímky z WEDOSu potvrzují shodné hodnoty. Tento návod neobsahuje přístupové údaje.
