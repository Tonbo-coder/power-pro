// One-time repair of archived div-based section blocks; preserves existing edits.
import fs from 'node:fs/promises';
import { load } from 'cheerio';
import { format } from 'prettier';
import { find, html as schema } from 'property-information';
const replacements=[['sppb-addon-wrapper','block-wrap'],['sppb-addon','block'],['sppb-section','section'],['sppb-row','layout-row'],['sppb-column','layout-column'],['sppb-col-','layout-col-'],['sppb-btn','button'],['sppb-','ui-']];
for(const root of ['F:/Projects/Weby/Power-pro-web','F:/Projects/Weby/Powerdrive-web']) {
 const map=JSON.parse(await fs.readFile(root+'/migration/id-map.json','utf8'));
 const pages=JSON.parse(await fs.readFile(root+'/content/pages.json','utf8'));
 const rename=s=>{for(const [a,b] of Object.entries(map).sort((a,b)=>b[0].length-a[0].length))s=s.replaceAll(a,b);for(const [a,b]of replacements)s=s.replaceAll(a,b);return s;};
 function jsx(node){
  if(node.type==='text')return node.data.trim()?'{'+JSON.stringify(node.data)+'}':'';
  if(!node.tagName||['script','style'].includes(node.tagName))return '';
  const attrs=node.attribs||{};
  if((attrs.class||'').includes('sppb-addon-openstreetmap'))return '<ContactMap />';
  const props=[];
  for(let [key,value]of Object.entries(attrs)){
   if(key.startsWith('on')||key==='style'||['data-id','data-addon-id','data-rowid','data-colid','data-col-zindex','data-zindex'].includes(key))continue;
   if(['class','id','for'].includes(key))value=rename(value);
   if(key.startsWith('data-sppb-wow-'))key=key.replace('data-sppb-wow-','data-motion-');
   const info=find(schema,key);const prop=key.startsWith('data-')||key.startsWith('aria-')?key:info.property;
   props.push(info.boolean?prop+'={true}':prop+'='+JSON.stringify(value));
  }
  const open='<'+node.tagName+(props.length?' '+props.join(' '):'');
  return ['img','hr','br','input'].includes(node.tagName)?open+' />':open+'>'+(node.children||[]).map(jsx).join('')+'</'+node.tagName+'>';
 }
 for(const p of pages){
  const $=load(await fs.readFile(root+'/migration/source/'+p.key+'.html','utf8'));
  const blocks=$('.page-content > div.sppb-section').toArray(); if(!blocks.length)continue;
  let content=await fs.readFile(root+'/content/pages/'+p.key+'.tsx','utf8');
  let css=await fs.readFile(root+'/public/styles/pages/'+p.key+'.css','utf8');
  for(const [i,block]of blocks.entries()){
   const originalId=$(block).attr('id'); if(map[originalId]&&content.includes('id="'+map[originalId]+'"'))continue;
   let n=0;
   $(block).find('[id]').addBack('[id]').each((_,e)=>{const id=$(e).attr('id');if(!map[id]){let old=rename(id);map[id]=`${p.key}-restored-${i+1}-${++n}`;css=css.replaceAll(old,map[id]);}});
   const next=$(block).nextAll('section').first().attr('id');
   const nextId=next?(map[next]||next):null;
   let index=nextId?content.search(new RegExp('<section\\s+[^>]*\\bid="'+nextId+'"')):-1;
   if(index<0)index=content.lastIndexOf('</>');
   content=content.slice(0,index)+jsx(block)+'\n'+content.slice(index);
   console.log(p.path,originalId,'restored');
  }
  await fs.writeFile(root+'/content/pages/'+p.key+'.tsx',await format(content,{parser:'typescript'}));
  await fs.writeFile(root+'/public/styles/pages/'+p.key+'.css',css);
 }
 await fs.writeFile(root+'/migration/id-map.json',JSON.stringify(map,null,2));
}
