import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';
for(const [root,origin] of [['F:/Projects/Weby/Power-pro-web','https://power-pro.cz'],['F:/Projects/Weby/Powerdrive-web','https://powerdrive.cz']]) {
 const old=JSON.parse(await fs.readFile(root+'/migration/assets.json','utf8'));const entries=[];
 async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else{const rel='/'+path.relative(root+'/public',file).replaceAll('\\','/');const bytes=await fs.readFile(file);const downloaded=old.find(e=>e.local===rel||e.file?.replaceAll('\\','/')===file.replaceAll('\\','/'));
 entries.push({local:rel,source:rel.startsWith('/styles/')?'Compiled or authored local stylesheet':rel==='/images/map/map-pin.svg'?'https://sppagebuilder.com/images/2021/logistics/map-pin.svg':downloaded?.url||origin+rel,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}}}
 await walk(root+'/public');await fs.writeFile(root+'/migration/asset-manifest.json',JSON.stringify({recordedAt:new Date().toISOString(),origin,files:entries},null,2));console.log(root,entries.length,'files',Math.round(entries.reduce((s,e)=>s+e.bytes,0)/1024/1024)+' MiB');
}
