import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { load } from 'cheerio';
const exec = promisify(execFile);
const sites = [
  {root:'F:/Projects/Weby/Power-pro-web', origin:'https://power-pro.cz'},
  {root:'F:/Projects/Weby/Powerdrive-web', origin:'https://powerdrive.cz'}
];
async function download(url, file) {
  await fs.mkdir(path.dirname(file),{recursive:true});
  const {stdout}=await exec('curl.exe',['-L','--fail','--retry','2','--max-time','90','-sS',url,'-o',file,'-w','%{http_code}'],{maxBuffer:1024*1024});
  if(stdout!=='200') throw new Error(`${stdout} ${url}`);
}
async function crawl(site){
  const queue=['/'],seen=new Set(), assets=new Map(), pages=[];
  const addAsset=(raw,base=site.origin)=>{
    if(!raw||/^(data:|blob:|#)/.test(raw)) return;
    try {const u=new URL(raw,base); if(!['http:','https:'].includes(u.protocol))return;
      if(u.pathname.endsWith('.js')||u.pathname.includes('/iconfont/'))return;
      if(u.origin!==site.origin&&!/fonts\.(googleapis|gstatic)\.com/.test(u.hostname))return;
      u.hash='';const local=u.origin===site.origin?u.pathname:'/external/'+u.hostname+u.pathname+(u.search?'-'+Buffer.from(u.search).toString('base64url').slice(0,32)+'.css':'');
      assets.set(u.href,{url:u.href,local,file:path.join(site.root,'public',decodeURIComponent(local))});
    }catch{}
  };
  while(queue.length&&seen.size<100){
    const route=queue.shift();if(seen.has(route))continue;seen.add(route);
    const key=route==='/'?'home':route.slice(1).replaceAll('/','__');
    const file=path.join(site.root,'migration/source',key+'.html');
    try {await download(site.origin+route,file);}catch(error){pages.push({route,error:String(error)});continue;}
    const html=await fs.readFile(file,'utf8'),$=load(html);
    if(!$('body').length||/Security verification required/.test(html)){pages.push({route,error:'hosting challenge'});continue;}
    const links=$('a[href]').map((_,el)=>({text:$(el).text().trim(),href:$(el).attr('href')})).get();
    for(const {href} of links){try{const u=new URL(href,site.origin+route);if(u.origin!==site.origin)continue;
      if(/\.(pdf|zip|jpe?g|png|webp)$/i.test(u.pathname)){addAsset(href);continue;}
      if(u.search||/\.[a-z]+$/i.test(u.pathname)||u.pathname.includes('@')||u.pathname.startsWith('/administrator'))continue;
      const p=u.pathname.replace(/\/$/,'')||'/'; if(!seen.has(p))queue.push(p);
    }catch{}}
    $('link[rel=stylesheet],link[rel=icon]').each((_,el)=>addAsset($(el).attr('href')));
    $('img,video,source').each((_,el)=>{for(const name of ['src','poster'])addAsset($(el).attr(name));});
    for(const m of html.matchAll(/url\(\s*["']?([^\)"']+)/g))addAsset(m[1]);
    const data={route,key,title:$('title').text(),description:$('meta[name=description]').attr('content')||'',links,headings:$('h1,h2,h3').map((_,el)=>$(el).text().trim()).get(),styles:$('link[rel=stylesheet]').map((_,el)=>$(el).attr('href')).get(),inlineStyles:$('style').map((_,el)=>$(el).html()).get(),scripts:$('script:not([src])').map((_,el)=>$(el).html()).get(),text:$('#sp-main').text().replace(/\s+/g,' ').trim()};
    pages.push(data);console.log(site.origin,route,data.title);
  }
  const downloaded=new Set(),failures=[];
  while([...assets.keys()].some(k=>!downloaded.has(k))){
    const batch=[...assets.values()].filter(a=>!downloaded.has(a.url)).slice(0,5);
    await Promise.all(batch.map(async a=>{downloaded.add(a.url);try{await download(a.url,a.file);if(a.url.includes('.css')||a.url.includes('fonts.googleapis')){const css=await fs.readFile(a.file,'utf8');for(const m of css.matchAll(/url\(\s*["']?([^\)"']+)/g))addAsset(m[1],a.url);}}catch(error){failures.push({url:a.url,error:String(error)});}}));
  }
  await fs.writeFile(path.join(site.root,'migration/inventory.json'),JSON.stringify(pages,null,2));
  await fs.writeFile(path.join(site.root,'migration/assets.json'),JSON.stringify([...assets.values()],null,2));
  await fs.writeFile(path.join(site.root,'migration/download-errors.json'),JSON.stringify(failures,null,2));
  console.log('COMPLETE',site.origin,'pages',pages.length,'assets',assets.size,'failures',failures.length);
}
await Promise.all(sites.map(crawl));
