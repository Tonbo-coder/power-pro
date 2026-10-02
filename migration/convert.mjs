// One-time conversion. The generated React files are the editable source of truth.
// Re-running this importer overwrites content; do not run it after editing a website.
import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import { PurgeCSS } from 'purgecss';
import postcss from 'postcss';
import safeParser from 'postcss-safe-parser';
import { format } from 'prettier';
import { find, html as htmlSchema, svg as svgSchema } from 'property-information';

const sites=[{root:'F:/Projects/Weby/Power-pro-web',origin:'https://power-pro.cz',brand:'Power Pro',id:'pro',port:3000},{root:'F:/Projects/Weby/Powerdrive-web',origin:'https://powerdrive.cz',brand:'Powerdrive',id:'drive',port:3001}];
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50);
const write=async(file,data)=>{await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,data);};
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
for(const site of sites){
 let inventory=JSON.parse(await fs.readFile(site.root+'/migration/inventory.json','utf8'));
 if(!inventory.some(p=>p.key==='e-mail-podekovani')){let $=load(await fs.readFile(site.root+'/migration/source/e-mail-podekovani.html','utf8'));inventory.push({route:'/e-mail-podekovani',key:'e-mail-podekovani',title:$('title').text(),description:$('meta[name=description]').attr('content')||'',styles:$('link[rel=stylesheet]').map((_,e)=>$(e).attr('href')).get()});}
 const documents=[];let allHtml='';const idMap=new Map();
 for(const p of inventory){const text=await fs.readFile(site.root+'/migration/source/'+p.key+'.html','utf8');const $=load(text);documents.push({p,$,text});allHtml+=text;}
 const replacements=[['sppb-addon-wrapper','block-wrap'],['sppb-addon','block'],['sppb-section','section'],['sppb-row','layout-row'],['sppb-column','layout-column'],['sppb-col-','layout-col-'],['sppb-btn','button'],['sppb-','ui-'],['sp-page-builder','page-content-root'],['com_sppagebuilder','content-site'],['com-sppagebuilder','content-site']];
 const rename=s=>{for(const [a,b] of [...idMap].sort((a,b)=>b[0].length-a[0].length))s=s.replaceAll(a,b);for(const [a,b] of replacements)s=s.replaceAll(a,b);return s.replaceAll("/media/content-site/", "/media/com_sppagebuilder/");};
 for(const {p,$} of documents){$('.page-content > .sppb-section').each((i,el)=>{let sectionName=i===$('.page-content > .sppb-section').length-1?'footer':p.key+'-'+(slug($(el).find('h1,h2,h3').first().text())||'section-'+(i+1));let n=0;$(el).find('[id]').addBack('[id]').each((_,e)=>{let id=$(e).attr('id');if(/^(section-id-|column-(wrap-)?id-|sppb-addon(-wrapper)?-|btn-)/.test(id)&&!idMap.has(id)){let role=e===el?'section':$(e).hasClass('sppb-addon-wrapper')?'wrap':id.startsWith('column-wrap')?'grid':id.startsWith('column-id')?'column':id.startsWith('btn-')?'button':'block';idMap.set(id,sectionName+'-'+role+'-'+(++n));}});});}
 const normalizeUrl=(s)=>s.replaceAll(site.origin,'').replace(/^\/\/www.youtube.com/,'https://www.youtube-nocookie.com').replace('/info@power-pro.cz','mailto:info@power-pro.cz').replace('https://tonbo.savana-hosting.cz/','/');
 const styleObject=s=>{const obj={};try{postcss.parse('x{'+s+'}').first.each(d=>{if(d.type==='decl')obj[d.prop.startsWith('--')?d.prop:d.prop.replace(/^-ms-/,'ms-').replace(/-([a-z])/g,(_,a)=>a.toUpperCase())]=normalizeUrl(d.value);});}catch{}return obj;};
 function jsx(node,inSvg=false){
  if(node.type==='text'){if(!node.data.trim())return /\n/.test(node.data)?'':' ';return '{'+JSON.stringify(node.data)+'}';}
  if(!node.tagName)return '';
  let tag=node.tagName; if(['script','style','noscript'].includes(tag))return '';
  const attrs=node.attribs||{},cl=attrs.class||'';
  if(cl.includes('sppb-addon-clients')){const imgs=[];const walk=n=>{if(n.tagName==='img'&&!imgs.some(i=>i.src===n.attribs.src))imgs.push({src:normalizeUrl(n.attribs.src),alt:n.attribs.alt||''});for(const c of n.children||[])walk(c);};walk(node);return '<PartnerCarousel logos={'+JSON.stringify(imgs)+'} />';}
  if(cl.split(/\s+/).includes('sppb-addon-form-builder'))return '<ContactForm />';
  if(cl.includes('sppb-addon-openstreetmap'))return '<ContactMap />';
  if(tag==='img'&&attrs.src==='/')return '';
  inSvg=inSvg||tag==='svg';
  const schema=inSvg?svgSchema:htmlSchema;
  const props=[];
  for(let [key,value] of Object.entries(attrs)){
   if(key.startsWith('on')||key==='x-data'||key==='srcset'||key==='data-id'||key==='data-addon-id'||key==='data-rowid'||key==='data-colid'||key==='data-col-zindex'||key==='data-zindex')continue;
   if(key==='style'){const obj=styleObject(value);delete obj.visibility;delete obj.animationName;if(Object.keys(obj).length)props.push('style={'+JSON.stringify(obj)+'}');continue;}
   if(key==='class'||key==='id'||key==='for')value=rename(value);
   if(['src','href','poster'].includes(key)){value=normalizeUrl(value);if(key==='poster'&&value==='/')continue;}
   if(key.startsWith('data-sppb-wow-'))key=key.replace('data-sppb-wow-','data-motion-');
   if(key==='data-title')key='data-caption';
   if(['frameborder','webkitallowfullscreen','mozallowfullscreen'].includes(key))continue;
   if(key==='type'&&tag==='source'&&attrs.src?.endsWith('.mp4'))value='video/mp4';
   const info=find(schema,key); let prop=info.property;
   if(key.startsWith('data-')||key.startsWith('aria-'))prop=key;
   if(key==='tabindex')prop='tabIndex';
   if(info.boolean){props.push(prop+'={true}');continue;}
   if(key==='selected')continue;
   if(prop==='value'&&tag==='input')prop='defaultValue';
   props.push(prop+'='+JSON.stringify(value));
  }
  if(tag==='img'&&!('alt' in attrs))props.push('alt=""');
  if(tag==='img')props.push('decoding="async"');
  if(tag==='video'){props.push('preload="metadata"');if('autoplay' in attrs)props.push('data-background-video="true"');}
  if(tag==='iframe'){if(!attrs.title)props.push('title="Video WindCube"');if(!attrs.loading)props.push('loading="lazy"');}
  if(cl.includes('consultation-card'))props.push('tabIndex={0}');
  if(tag==='a'&&attrs.target==='_blank'&&!('rel' in attrs))props.push('rel="noopener noreferrer"');
  if(tag==='a'&&node.parent?.parent?.attribs?.class?.includes('gallery'))props.push('data-gallery="true"');
  if(tag==='i'&&/fa-/.test(cl)&&!('aria-hidden' in attrs))props.push('aria-hidden="true"');
  const open='<'+tag+(props.length?' '+props.join(' '):'');
  return voidTags.has(tag)?open+' />':open+'>'+ (node.children||[]).map(n=>jsx(n,inSvg)).join('')+'</'+tag+'>';
 }
 let home=documents[0];
 function nav($,ul){return $(ul).children('li').map((_,li)=>{const a=$(li).children('a').first();const nested=$(li).children('.sp-dropdown').find('ul').first();return {label:a.text().trim(),href:normalizeUrl(a.attr('href')||'/'),...(nested.length?{children:nav($,nested)}:{})};}).get();}
 await write(site.root+'/content/site.json',JSON.stringify({name:site.brand,id:site.id,url:site.origin,port:site.port,logo:normalizeUrl(home.$('.logo-image').first().attr('src')),logoHeight:site.id==='pro'?90:105,email:site.id==='pro'?'info@power-pro.cz':'info@powerdrive.cz',phone:site.id==='pro'?'+420 702 204 789':'+420 774 966 547',navigation:nav(home.$,home.$('.sp-megamenu-parent').first())},null,2));
 const allCss=[];for(const url of home.p.styles.filter(s=>!s.includes('/sppb-css/')&&!s.includes('googleapis')&&!s.includes('/iconfont/')&&!s.includes('joomla-alert')&&!s.includes('dynamic-content')&&!s.includes('color-switcher')&&!s.includes('chosen'))){try{allCss.push({url,css:await fs.readFile(site.root+'/public'+url.split('?')[0],'utf8')});}catch{}}
 if(site.id==='drive'){const assets=JSON.parse(await fs.readFile(site.root+'/migration/assets.json','utf8'));for(const a of assets.filter(a=>a.url.includes('fonts.googleapis'))){let css=await fs.readFile(a.file,'utf8');for(const b of assets.filter(b=>b.url.includes('fonts.gstatic')))css=css.replaceAll(b.url,b.local);allCss.unshift({url:a.local,css});}}
 const cssFixUrls=(css,url)=>css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g,(full,q,value)=>{if(/^(data:|#)/.test(value))return full;try{let u=new URL(value,new URL(url,site.origin));return 'url("'+normalizeUrl(u.href)+'")';}catch{return full;}});
 const cssBase=allCss.map(a=>cssFixUrls(a.css,a.url)).join('\n').replace(/<!--.*?-->/gs,'').replaceAll(': hover',':hover');
 const safelist=[/^(sp-|offcanvas|burger|logo|container|row|col-|d-|flex-|justify-|align-|icon|sppb-form|sppb-btn)/,/fade/,/slide/,/zoom/,/animated/,/active/,/show/];
 let purged=await new PurgeCSS().purge({content:[{raw:allHtml,extension:'html'}],css:[{raw:cssBase}],safelist:{standard:safelist,deep:[/^sp-/,/^sppb-form/],greedy:[/:root/,/body/,/html/]} });
 await write(site.root+'/public/styles/base.css',rename(purged[0].css));
 const registry=[];
 let footerDone=false;
 for(const {p,$} of documents){
  const sections=$('.page-content > .sppb-section').toArray();
  if(!sections.length)throw new Error('Missing page content '+p.route);
  let pageCss='';for(const url of p.styles.filter(x=>x.includes('/sppb-css/'))){let file=site.root+'/public'+url;try{pageCss+=await fs.readFile(file,'utf8');}catch{const {execFileSync}=await import('node:child_process');await fs.mkdir(path.dirname(file),{recursive:true});execFileSync('curl.exe',['-L','--fail','-sS',site.origin+url,'-o',file]);pageCss+=await fs.readFile(file,'utf8');}}
  pageCss+=$('style').map((_,e)=>$(e).html()).get().join('\n');
  pageCss=rename(cssFixUrls(pageCss,'/'));
  let parsed=safeParser(pageCss);parsed.walkComments(c=>c.remove());parsed.walkRules(rule=>{if(rule.parent.type==='atrule'&&rule.parent.name.includes('keyframes'))return;rule.selectors=rule.selectors.map(s=>s.includes(':root')?s.replaceAll(':root',`[data-page="${p.key}"]`):`[data-page="${p.key}"] ${s.replace(/^body\s*/,'')}`);});
  await write(site.root+'/public/styles/pages/'+p.key+'.css',parsed.toString());
  const footer=sections.pop();if(!footerDone){await write(site.root+'/components/Footer.tsx',await format('export default function Footer(){return '+jsx($('#sp-footer')[0])+'}',{parser:'typescript'}));footerDone=true;}
  let content=sections.map((s,i)=>'{/* '+($(s).find('h1,h2,h3').first().text().trim()||'Sekce '+(i+1))+' */}'+jsx(s)).join('\n');
  let source='import ContactForm from "@/components/ContactForm";\nimport ContactMap from "@/components/ContactMap";\nimport PartnerCarousel from "@/components/PartnerCarousel";\n\n/** Obsah stránky '+p.route+'. Upravujte přímo; původní export není za běhu používán. */\nexport default function Content(){return <>'+content+'</>}';
  await write(site.root+'/content/pages/'+p.key+'.tsx',await format(source,{parser:'typescript'}));
  registry.push({path:p.route,key:p.key,title:p.title,description:p.description||'',pageClass:rename($('#sp-page-builder').attr('class')||'')});
 }
 await write(site.root+'/content/pages.json',JSON.stringify(registry,null,2));
 await write(site.root+'/content/registry.ts',registry.map((r,i)=>'import Page'+i+' from "./pages/'+r.key+'";').join('\n')+'\nexport const pageComponents = {\n'+registry.map((r,i)=>'  '+JSON.stringify(r.key)+': Page'+i).join(',\n')+'\n};\n');
 await write(site.root+'/migration/id-map.json',JSON.stringify(Object.fromEntries(idMap),null,2));
 await write(site.root+'/migration/inventory.json',JSON.stringify(inventory,null,2));
 await write(site.root+'/package.json',JSON.stringify({name:site.id==='pro'?'power-pro-web':'powerdrive-web',version:'1.0.0',private:true,scripts:{dev:'next dev --hostname 127.0.0.1 --port '+site.port,build:'next build',start:'next start --hostname 127.0.0.1 --port '+site.port,typecheck:'tsc --noEmit',test:'node --test tests/*.test.mjs'},dependencies:{next:'16.3.6',react:'19.3.0','react-dom':'19.3.0',nodemailer:'10.0.11'},devDependencies:{typescript:'^5.9.3','@types/node':'^24.10.1','@types/react':'^19.2.7','@types/react-dom':'^19.2.3','@types/nodemailer':'^7.0.4'}},null,2));
 console.log(site.brand,registry.length,'pages converted; CSS',cssBase.length,'->',purged[0].css.length);
}
