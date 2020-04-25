#!/usr/bin/env node

const { program } = require('commander');
import { app } from './parser'

program
  .version('2.0.0', '-v, --version')
  .name('Format Markdown (ForMd)')
  .option('-i, --inline', 'convert text to inline Markdown', 'inline')
  .option('-r, --reference', 'convert text to reference Markdown', 'reference')
  .parse(process.argv);

const format = (program.inline || program.reference) || 'reference'

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (d) => app(d, format))
