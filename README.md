### [`formd`][9]: A Markdown formatting tool:

[Markdown][wiki], is a text-to-[HTML][] conversion tool for web writers developed by [John Gruber](http://en.wikipedia.org/wiki/John_Gruber). The [main page](http://daringfireball.net/projects/markdown/) and accompanying [docs][5] provide a comprehensive overview on how to implement the Markdown syntax. The [Markdown Dingus](http://daringfireball.net/projects/markdown/dingus) is also a useful resource for learning Markdown. 

`formd` is a tool for (for)matting (m)ark(d)own that allows rapid conversion between the [two styles](http://daringfireball.net/projects/markdown/syntax#link) of Markdown links&mdash;_inline_ and _referenced_. Why do you need `formd`? Inline Markdown is difficult to read, but useful for writing and editing because the linked text and URL are adjacent to the words you are writing. Referenced Markdown is awkward while writing because it requires jumping between text links within text and the reference section at the bottom of a document. However, referenced Markdown is the superior syntax for reading because URLs do not breakup the flow of words or sentences. `formd` provides the best of both worlds by allowing users to toggle Markdown formats between inline while writing and referenced while reading.

`formd` reads and writes to [standard streams](http://en.wikipedia.org/wiki/Standard_streams), so it can be adapted to a wide-range of user work flows. See [this post](http://www.drbunsen.org/formd-a-markdown-formatting-tool.html) for further details and work flow examples for using `formd` with [Vim](http://www.vim.org/) or [TextExpander][TE].

* Dependencies
Python 2.4+

* Installation:
+ Download formd and place it somwhere in your path:
`git clone https://github.com/drbunsen/formd.git` ~/bin/

* Usage
There are two command line option for `formd`:
+ To generate referenced Markdown use the `-r` flag:
`formd -r`
+ To generate inline Markdown use the `-i` flag:
`formd -i`
+ A simple working example of `formd`:
`cat ugly_markdown_file.md | formd -r > reference_formatted_file.md`

Here is a video showing `formd` in action on this document.

See [this post][] for additional usage examples.

[HTML]:http://en.wikipedia.org/wiki/HTML
[5]: http://daringfireball.net/projects/markdown/syntax  "Markdown Docs"
[main page]:http://daringfireball.net/projects/markdown/
[wiki]: http://en.wikipedia.org/wiki/Markdown  "Wikipedia Entry for Markdown"
[9]:https://github.com/drbunsen/formd
[this post]: http://www.drbunsen.org/formd-a-markdown-formatting-tool.html
[TE]: http://smilesoftware.com/TextExpander/
