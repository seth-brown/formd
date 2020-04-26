import { formd } from './src/parser'

// const md = "* [homebrew](https://brew.sh)\n* [pandoc](https://pandoc.org) \n* [pandoc template](https://github.com/Wandmalfarbe/pandoc-latex-template)"

// links in inline list
const inlineListMd = "* a link [here](a.net)\n* [another link](b.net)\n* a [3rd link](c.net) on this line"

// links in reference list
const referenceListMd = "* a link [here][1]\n* [another link][2]\n* a [3rd link][3] on this line\n\n[1]: a.net\n[2]: b.net\n[3]: c.net"

console.log(referenceListMd)
console.log('============================')
const main = formd(inlineListMd, 'reference') 
