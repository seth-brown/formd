const marked = require('marked')
marked.setOptions({ gfm: true });

import { appnRefRe, getReferenceKey, classifyLink, mutateMd } from './utils'
import {
    Ref
  , Format
  , Token
  , TokenArray
  , Link
  , LinkArray
  , MarkdownLink
  , MarkdownArray 
} from './interfaces'

export const processLinks = async(links:LinkArray) => {
  const linkData:MarkdownArray = links.map((link, idx:number) => {
    const match = link.match
    const refNum = idx + 1
    const bodyLinkRef = `[${link.text}][${refNum}]`
    const bodyLinkInl = `[${link.text}](${link.href})`
    const titleText = link.title === '' ? '': `(${link.title})`
    const appendixRef  = `[${refNum}]: ${link.href} ${titleText}`

    const datum:MarkdownLink = {
                        match: link.match
                      , class: link.class
                      , bodyRef: bodyLinkRef
                      , bodyInl: bodyLinkInl
                      , appnRef: appendixRef
                      , ref: link.ref
                      }
    return datum
  })
  return Promise.resolve(linkData)
}

const processTokens = async(tokens:TokenArray) => {

  const refObj = tokens.links
  const nRefs = Object.keys(refObj).length
  const refMap = Object.keys(refObj).reduce((acc: any, oriRef:string) => {
    const refData = refObj[oriRef]
    const href = refData.href
    const title = refData.title === undefined ? '': refData.title
    const datum = {key: oriRef, href: href, title: title}
    acc.set(oriRef, datum)
    return acc
  }, new Map())

  let links:LinkArray = []
  const fetchLinks = (arr:TokenArray) => {
    for (let i=0; i<arr.length; i++) {
      const obj: Token = arr[i]
      if (obj?.type === 'link') {
        const linkType = classifyLink(obj.raw)
        if (linkType !== null) {
          const title = obj.title === null ? '': obj.title
          const refSentinel: Ref = {key: '', href: '', title: ''}
          let datum: Link = {
                        match: obj.raw
                      , href: obj.href
                      , title: title
                      , text: obj.text
                      , class: linkType
                      , ref: refSentinel
                      }
          if (datum.class === 'reference') {
            const ref = getReferenceKey(datum.match)
            const refData: Ref = refMap.get(ref)
            datum.ref = refData
          }
          links.push(datum)
        }
      } 
      if (obj?.tokens) {
        fetchLinks(obj.tokens)
      }
    }
  }
  fetchLinks(tokens)
  return Promise.resolve(links)
}

export const parser = async(md:any, tokens:TokenArray, format:Format) => {
  try { 
    const links = await processTokens(tokens)
    return links.length > 0
      ? await processLinks(links).then((links) => mutateMd(md, links, format))
      : md
  } catch (err) {
    console.log(err)
  }
}

export const app = async(md:any, format:Format) => {
  const tokens = marked.lexer(md)
  parser(md, tokens, format)
    .then(res => console.log(res))
}
