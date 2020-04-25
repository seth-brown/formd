"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appnRefRe = (ref) => new RegExp('\\[' + ref + '\\]:.*');
exports.getReferenceKey = (text) => {
    const refMatch = text.match(/\]\[.*?\]$/);
    const ref = refMatch === null
        ? ''
        : refMatch[0].replace(/^\]\[/, '').replace(/\]$/, '');
    return ref;
};
exports.classifyLink = (text) => {
    const inlRe = /^\[.*?]\(.*?\)$/;
    const refRe = /^\[.*?]\[.*?\]$/;
    let match = null;
    let inlMatch = text.match(inlRe);
    let refMatch = text.match(refRe);
    if (inlMatch !== null)
        match = 'inline';
    if (refMatch !== null)
        match = 'reference';
    return match;
};
const linkFmt = (md, links, format) => {
    let mmd = '';
    let refLines = [];
    const stripNewlineEnds = /\s+$/g;
    const linkStyle = format === 'reference'
        ? 'bodyRef'
        : 'bodyInl';
    for (const link of links) {
        const re = exports.appnRefRe(link.ref.key);
        let mkd = mmd === '' ? md : mmd;
        mkd = mkd.replace(link.match, link[linkStyle]);
        mkd = mkd.replace(re, '');
        mmd = mkd;
        refLines.push(link.appnRef);
    }
    if (format === 'reference') {
        mmd = mmd.replace(stripNewlineEnds, '');
        let refStr = refLines.map(d => d.trim()).join('\n');
        mmd = [mmd, refStr].join('\n\n');
    }
    return mmd.replace(stripNewlineEnds, '');
};
exports.mutateMd = (md, links, format) => __awaiter(void 0, void 0, void 0, function* () {
    const mmd = linkFmt(md, links, format);
    return Promise.resolve(mmd);
});
