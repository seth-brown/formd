#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { program } = require('commander');
const parser_1 = require("./parser");
program
    .version('2.0.0', '-v, --version')
    .name('Format Markdown (ForMd)')
    .option('-i, --inline', 'convert text to inline Markdown', 'inline')
    .option('-r, --reference', 'convert text to reference Markdown', 'reference')
    .parse(process.argv);
const format = (program.inline || program.reference) || 'reference';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (d) => parser_1.app(d, format));
