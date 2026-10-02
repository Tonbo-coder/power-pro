import fs from 'node:fs/promises'; import postcss from 'postcss';
const css=postcss.parse(await fs.readFile('public/styles/pages/kontakt.css','utf8'));css.walkRules(r=>{if(/form-|captcha|button-custom/.test(r.selector)) console.log(r.parent.type==='atrule'?r.parent.params:'',r.toString());});
