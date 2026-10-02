import fs from 'node:fs/promises'; import {load} from 'cheerio';
const $=load(await fs.readFile('migration/source/kontakt.html','utf8'));
console.log($('#section-id-1616415380692').html());
console.log($('script').map((_,e)=>$(e).html()).get().filter(s=>/map|leaflet|esri/i.test(s)).join('\n').slice(0,12000));
