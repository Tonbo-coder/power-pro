import fs from 'node:fs/promises';
import postcss from 'postcss';
for(const root of ['F:/Projects/Weby/Power-pro-web','F:/Projects/Weby/Powerdrive-web']) {
 const file=root+'/public/styles/base.css'; const css=postcss.parse(await fs.readFile(file,'utf8'));
 css.walkRules(r=>{if(r.selector==='.sp-dot-indicator-wrap .dot-indicator'){r.walkDecls(d=>{if(d.prop.endsWith('transition-property'))d.value='transform';if(d.prop==='width')d.value='100%';});r.append({prop:'transform',value:'scaleX(0)'});r.append({prop:'transform-origin',value:'left'});}if(r.selector==='.sp-dot-indicator-wrap .dot-indicator.active'){r.append({prop:'transform',value:'scaleX(1)'});}});
 await fs.writeFile(file,css.toString());
 const pfile=root+'/package.json';const p=JSON.parse(await fs.readFile(pfile,'utf8'));p.scripts['test:integration']='node scripts/check-contact.mjs';p.engines={node:'>=22'};await fs.writeFile(pfile,JSON.stringify(p,null,2)+'\n');
}
const converter='migration/convert.mjs';let source=await fs.readFile(converter,'utf8');source=source.replaceAll('.page-content > section','.page-content > .sppb-section').replaceAll("nodemailer:'^7.0.10'","nodemailer:'10.0.11'");await fs.writeFile(converter,source);
