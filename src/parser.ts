const remark = require('remark')
const refLinks = require('remark-reference-links')
const inlineLinks = require('remark-inline-links')
import { Format, VFile }  from './interfaces'

export const parser = async(md:string, format:Format) => {  
    const style = format === 'inline' ? inlineLinks : refLinks
    const res:VFile = await remark().use(style).process(md)
    return res.contents
}

export const formd = async(md:any, format:Format) => {
  parser(md,format)
    .then(res => console.log(res))
}
