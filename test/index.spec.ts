const marked = require('marked')
import { parser } from "./../src/parser";
import { Format } from './../src/interfaces';

marked.setOptions({ gfm: true });

// valid inline links
const mdInline = "The quick brown [fox](http://en.wikipedia.org/wiki/Fox) jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog)."

// valid reference links with one title
const mdReference = "The quick brown [fox][1] jumped over the lazy [dog][2].\n\n[1]: http://en.wikipedia.org/wiki/Fox\n[2]: http://en.wikipedia.org/wiki/Dog"

// malformed reference links
const mdBareReference = "The quick brown [fox][1] jumped over the lazy [dog][2].\n[1]: http://en.wikipedia.org/wiki/Fox\n[2]: http://en.wikipedia.org/wiki/Dog"

// no links
const mdNoLinks = ''

// image reference
const imgRef = "![GitHub Logo](/images/logo.png)\nFormat: ![Alt Text](url)"

const codeBlock = "`[x][y]`"

const genMarkdown = async(md:any, format:Format) => {
  const tokens = marked.lexer(md)
  const res = await parser(md, tokens, format)
  return res
}

test("identity inline links", async() => {
  const res = await genMarkdown(mdInline, 'inline')
  expect(res).toEqual(mdInline)
})

test("identity reference links", async() => {
  const res = await genMarkdown(mdReference, 'reference')
  expect(res).toEqual(mdReference)
})

test("identity malformed reference links", async() => {
  const res = await genMarkdown(mdBareReference, 'reference')
  expect(res).toEqual(mdBareReference)
})

test("identity no links", async() => {
  const res = await genMarkdown(mdNoLinks, 'reference')
  expect(res).toEqual(mdNoLinks)
})

test("reference to inline links", async() => {
  const res = await genMarkdown(mdReference, 'inline')
  expect(res).toEqual(mdInline)
})

test("inline to reference links", async() => {
  const res = await genMarkdown(mdInline, 'reference')
  expect(res).toEqual(mdReference)
})

test("do not alter image reference", async() => {
  const res = await genMarkdown(imgRef, 'reference')
  expect(res).toEqual(imgRef)
})


test("do not modify codeblock", async() => {
  const res = await genMarkdown(codeBlock, 'reference')
  expect(res).toEqual(codeBlock)
})
