import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const sites=[{root:'F:/Projects/Weby/Power-pro-web',base:'http://127.0.0.1:3000'},{root:'F:/Projects/Weby/Powerdrive-web',base:'http://127.0.0.1:3001'}];
for(const site of sites){
 const pages=JSON.parse(await fs.readFile(site.root+'/content/pages.json','utf8'));
 const idMap=JSON.parse(await fs.readFile(site.root+'/migration/id-map.json','utf8'));
 const results=[],documents=new Map();
 for(let i=0;i<pages.length;i+=4)await Promise.all(pages.slice(i,i+4).map(async p=>{
   const res=await fetch(site.base+p.path);const html=await res.text();const $=load(html);documents.set(p.path,$);
   const original=load(await fs.readFile(site.root+'/migration/source/'+p.key+'.html','utf8'));
   const headings=s=>s('#sp-main-body h1,#sp-main-body h2,#sp-main-body h3').map((_,e)=>s(e).text().replace(/\s+/g,' ').trim()).get().filter(Boolean);
   const originalSections=original('#sp-main-body .page-content > .sppb-section').map((_,e)=>idMap[original(e).attr('id')]||original(e).attr('id')).get();
   const sections=$('#sp-main-body .page-content > .section').map((_,e)=>$(e).attr('id')).get();
   results.push({path:p.path,status:res.status,title:$('title').text(),headingsMatch:JSON.stringify(headings($))===JSON.stringify(headings(original)),sectionsMatch:JSON.stringify(sections)===JSON.stringify(originalSections),sections,originalSections,headings:headings($),originalHeadings:headings(original)});
 }));
 const issues=[];const assetPaths=new Set();
 for(const [route,$] of documents){
  $('a[href],img[src],source[src],video[poster],link[rel=stylesheet]').each((_,e)=>{
   const attr=e.tagName==='a'||e.tagName==='link'?'href':e.tagName==='video'?'poster':'src';let value=$(e).attr(attr);if(!value)return;
   let u;try{u=new URL(value,site.base+route);}catch{return;}if(u.origin!==site.base)return;
   if(e.tagName==='a'&&documents.has(u.pathname)){
     if(u.hash&&!documents.get(u.pathname)(`[id="${decodeURIComponent(u.hash.slice(1))}"]`).length)issues.push({route,type:'missing-anchor',url:value});
   }else if(!u.pathname.startsWith('/_next/')){assetPaths.add(u.pathname);if(!existsSync(path.join(site.root,'public',decodeURIComponent(u.pathname))))issues.push({route,type:'missing-asset-or-route',url:value});}
  });
 }
 const styles=[site.root+'/public/styles/base.css',site.root+'/public/styles/refinements.css',...pages.map(p=>site.root+'/public/styles/pages/'+p.key+'.css')];
 for(const file of styles){const css=await fs.readFile(file,'utf8');for(const match of css.matchAll(/url\(\s*["']?(\/[^"')\s]+)/g)){if(match[1]==='/')continue;let p=match[1].split('?')[0].split('#')[0];assetPaths.add(p);if(!existsSync(path.join(site.root,'public',decodeURIComponent(p))))issues.push({file,type:'missing-css-asset',url:p});}}
 const notFound=await fetch(site.base+'/tato-stranka-neexistuje');
 const report={checkedAt:new Date().toISOString(),pages:results.sort((a,b)=>a.path.localeCompare(b.path)),uniqueAssets:assetPaths.size,notFoundStatus:notFound.status,issues};
 await fs.writeFile(site.root+'/migration/verification.json',JSON.stringify(report,null,2));
 const badPages=results.filter(p=>p.status!==200||!p.headingsMatch||!p.sectionsMatch);
 console.log(site.root,JSON.stringify({pages:results.length,badPages,notFound:notFound.status,issues},null,2));
 if(badPages.length||issues.length||notFound.status!==404)process.exitCode=1;
}
