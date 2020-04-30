const marked = require('marked')
import { parser } from "./../src/parser";
import { Format } from './../src/interfaces';

marked.setOptions({ gfm: true });

// valid inline links
const mdInline = "The quick brown [fox](http://en.wikipedia.org/wiki/Fox) jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog)."

// valid reference links
const mdReference = "The quick brown [fox][1] jumped over the lazy [dog][2].\n\n[1]: http://en.wikipedia.org/wiki/Fox\n[2]: http://en.wikipedia.org/wiki/Dog"

// valid inline links w/ title
const mdInlineWithTitle = 'The quick brown [fox](http://en.wikipedia.org/wiki/Fox "Fox") jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog).'

// valid reference links w/ title
const mdReferenceWithTitle = 'The quick brown [fox][1] jumped over the lazy [dog][2].\n\n[1]: http://en.wikipedia.org/wiki/Fox "Fox"\n[2]: http://en.wikipedia.org/wiki/Dog'

// malformed reference links
const mdBareReference = "The quick brown [fox][1] jumped over the lazy [dog][2].\n[1]: http://en.wikipedia.org/wiki/Fox\n[2]: http://en.wikipedia.org/wiki/Dog"

// no links
const mdNoLinks = ''

// image reference
const imgRef = "![GitHub Logo](/images/logo.png)\nFormat: ![Alt Text](url)"

const codeBlock = "`[x][y]`"

// links in inline list
const inlineListMd = "* a link [here](a.net)\n* [another link](b.net)\n* a [3rd link](c.net) on this line"

// links in reference list
const referenceListMd = "* a link [here][1]\n* [another link][2]\n* a [3rd link][3] on this line\n\n[1]: a.net\n[2]: b.net\n[3]: c.net"


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

test("reference to inline links with title", async() => {
  const res = await genMarkdown(mdReferenceWithTitle, 'inline')
  expect(res).toEqual(mdInlineWithTitle)
})

test("inline to reference links with title", async() => {
  const res = await genMarkdown(mdInlineWithTitle, 'reference')
  expect(res).toEqual(mdReferenceWithTitle)
})

test("inline list links to reference", async() => {
  const res = await genMarkdown(inlineListMd, 'reference')
  expect(res).toEqual(referenceListMd)
})

test("reference list links to inline", async() => {
  const res = await genMarkdown(referenceListMd, 'inline')
  expect(res).toEqual(inlineListMd)
})

test("do not alter image reference", async() => {
  const res = await genMarkdown(imgRef, 'reference')
  expect(res).toEqual(imgRef)
})

test("do not modify codeblock", async() => {
  const res = await genMarkdown(codeBlock, 'reference')
  expect(res).toEqual(codeBlock)
})
