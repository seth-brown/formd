import { Format, MarkdownArray } from './interfaces'

// find all reference lines in the appendix
export const appnRefRe = (ref:string) => new RegExp('\\[' + ref + '\\]:.*\n?')

// get the text in a markdown reference in the format: [text][1]
export const getReferenceKey = (text:string) => {
  const refMatch = text.match(/\]\[.*?\]$/)
  const ref = refMatch === null
    ? ''
    : refMatch[0].replace(/^\]\[/, '').replace(/\]$/, '')
  return ref
}

// classify links as reference || inline
export const classifyLink = (text:string) => {
  const inlRe = /^\[.*?]\(.*?\)$/;
  const refRe = /^\[.*?]\[.*?\]$/;
  let match = null
  let inlMatch = text.match(inlRe)
  let refMatch = text.match(refRe)
  if (inlMatch !== null) match = 'inline'
  if (refMatch !== null) match = 'reference'
  return match
}

const linkFmt = (md: string, links:MarkdownArray, format:Format) => {
  let mmd = ''
  let refLines = []
  const stripNewlineEnds = /\s+$/g;
  const deleteBlankLine = /^\s*\n/gm;
  const linkStyle = format === 'reference'
      ? 'bodyRef'
      : 'bodyInl'
  for (const link of links) {
    const re = appnRefRe(link.ref.key)
    let mkd = mmd === '' ? md: mmd
    mkd = mkd.replace(link.match, link[linkStyle])
    mkd = mkd.replace(re, '')
    mmd = mkd
    refLines.push(link.appnRef.trim())
  }

  if (format === 'reference') {
    mmd = mmd.trim()
    let refStr = refLines.join('\n')
    // add a line space between body and reference
    mmd = [mmd, refStr].join('\n\n')
  }
  return mmd.trim()
}

export const mutateMd = async(md:string, links:MarkdownArray, format:Format) => {
  const mmd = linkFmt(md, links, format)
  return mmd
}
