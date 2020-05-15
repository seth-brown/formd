const marked = require('marked')
import { parser, formd } from "./../src/parser";
import { Format } from './../src/interfaces';

marked.setOptions({ gfm: true });

// valid inline links
const mdInline = "The quick brown [fox](http://en.wikipedia.org/wiki/Fox) jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog).\n"

// valid reference links
const mdReference = "The quick brown [fox][1] jumped over the lazy [dog][2].\n\n[1]: http://en.wikipedia.org/wiki/Fox\n\n[2]: http://en.wikipedia.org/wiki/Dog\n"

// valid inline links w/ title
const mdInlineWithTitle = 'The quick brown [fox](http://en.wikipedia.org/wiki/Fox "Fox") jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog).\n'

// valid reference links w/ title
const mdReferenceWithTitle = 'The quick brown [fox][1] jumped over the lazy [dog][2].\n\n[1]: http://en.wikipedia.org/wiki/Fox "Fox"\n\n[2]: http://en.wikipedia.org/wiki/Dog\n'

// no links
const mdNoLinks = '\n'

const codeBlock = "`[x][y]`\n"

const genMarkdown = async(fn:any, md:string, format:Format) => {
  const res = await fn(md, format)
  return res
}

test("identity inline links", async() => {
  const res = await genMarkdown(parser, mdInline, 'inline')
  expect(res).toEqual(mdInline)
})

test("identity reference links", async() => {
  const res = await genMarkdown(parser, mdReference, 'reference')
  expect(res).toEqual(mdReference)
})

test("identity no links", async() => {
  const res = await genMarkdown(parser, mdNoLinks, 'reference')
  expect(res).toEqual(mdNoLinks)
})

test("reference to inline links", async() => {
  const res = await genMarkdown(parser, mdReference, 'inline')
  expect(res).toEqual(mdInline)
})

test("inline to reference links", async() => {
  const res = await genMarkdown(parser, mdInline, 'reference')
  expect(res).toEqual(mdReference)
})

test("reference to inline links with title", async() => {
  const res = await genMarkdown(parser, mdReferenceWithTitle, 'inline')
  expect(res).toEqual(mdInlineWithTitle)
})

test("inline to reference links with title", async() => {
  const res = await genMarkdown(parser, mdInlineWithTitle, 'reference')
  expect(res).toEqual(mdReferenceWithTitle)
})

test("do not modify codeblock", async() => {
  const res = await genMarkdown(parser, codeBlock, 'reference')
  expect(res).toEqual(codeBlock)
})
