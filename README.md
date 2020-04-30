formd: a markdown formatting tool
================================

![Build Status](https://github.com/seth-brown/formd/workflows/Build%20Status/badge.svg)

`formd` is a CLI tool for (for)matting (m)ark(d)own that allows interconversion between the [two styles](https://github.github.com/gfm/) of Markdown links, inline and referenced. The tool conforms to the Github Flavored Markdown [spec](https://github.github.com/gfm/).

Installation
-------------

``` bash
npm install -g @seth-brown/formd
```

If the default location npm installs packages to isn't in your path, you may need to add it to your path. For example:

``` bash
echo 'export PATH="$HOME/.node/bin:$PATH"' >> ~/.zshrc
```

Motivation
----------

Inline Markdown is difficult to read, but useful for writing and editing because the linked text and URLs are adjacent to the words you are writing. For example:

> The quick brown [fox](http://en.wikipedia.org/wiki/Fox) jumped over the lazy [dog](http://en.wikipedia.org/wiki/Dog).

Referenced Markdown is awkward while writing because it requires jumping between links within the text and the reference section of the document. However, referenced Markdown is the superior syntax for reading because URLs do not breakup the flow of words or sentences. For example:

> The quick brown [fox][1] jumped over the lazy [dog][2].

`formd` provides the best of both worlds by allowing users to quickly toggle Markdown formats between inline while writing and referenced while reading. `formd` reads and writes to standard streams, so it can be adapted to a wide-range of user workflows.

Usage
-----

For help:
```
formd -h
```

To generate referenced Markdown use the -r flag:
``` bash
formd -r < <(echo "a line of text\na link with a [link]('www.foo.com')")
```

To generate inline Markdown use the -i flag:
``` bash
cat my-markdown.md | formd -i
```

Usage with Text Editors
-----------------------

`formd` can be integrated with editors like Vim. The easiest option is to call it
directly from within a Vim buffer. For example:

``` vim
:%! formd -r
```

An easier approach is to use a function to execute `formd` and return the cursor
back to it's original position within the buffer. 

``` vim
" a function to execute `formd` and return the cursor back
" to it's original position within the buffer. 

" This script assumes `formd` is in your path at:
 
function! Formd(option)
    :let save_view = winsaveview()
    :let flag = a:option
    :if flag == "-i"
        :%! formd -i
    :else
        :%! formd -r
    :endif
    :call winrestview(save_view)
endfunction
 
" formd mappings 
nmap <leader>fr :call Formd("-r")<CR>
nmap <leader>fi :call Formd("-i")<CR>
```

Release History
---------
* 1.0.0 Initial release
* 2.0.0 Ported library to Typescript/Node
