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
const marked = require('marked');
marked.setOptions({ gfm: true });
const utils_1 = require("./utils");
exports.processLinks = (links) => __awaiter(void 0, void 0, void 0, function* () {
    const linkData = links.map((link, idx) => {
        const match = link.match;
        const refNum = idx + 1;
        const bodyLinkRef = `[${link.text}][${refNum}]`;
        const bodyLinkInl = `[${link.text}](${link.href})`;
        const titleText = link.title === '' ? '' : `(${link.title})`;
        const appendixRef = `[${refNum}]: ${link.href} ${titleText}`;
        const datum = {
            match: link.match,
            class: link.class,
            bodyRef: bodyLinkRef,
            bodyInl: bodyLinkInl,
            appnRef: appendixRef,
            ref: link.ref
        };
        return datum;
    });
    return Promise.resolve(linkData);
});
const processTokens = (tokens) => __awaiter(void 0, void 0, void 0, function* () {
    const refObj = tokens.links;
    const nRefs = Object.keys(refObj).length;
    const refMap = Object.keys(refObj).reduce((acc, oriRef) => {
        const refData = refObj[oriRef];
        const href = refData.href;
        const title = refData.title === undefined ? '' : refData.title;
        const datum = { key: oriRef, href: href, title: title };
        acc.set(oriRef, datum);
        return acc;
    }, new Map());
    let links = [];
    const fetchLinks = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            if ((obj === null || obj === void 0 ? void 0 : obj.type) === 'link') {
                const linkType = utils_1.classifyLink(obj.raw);
                if (linkType !== null) {
                    const title = obj.title === null ? '' : obj.title;
                    const refSentinel = { key: '', href: '', title: '' };
                    let datum = {
                        match: obj.raw,
                        href: obj.href,
                        title: title,
                        text: obj.text,
                        class: linkType,
                        ref: refSentinel
                    };
                    if (datum.class === 'reference') {
                        const ref = utils_1.getReferenceKey(datum.match);
                        const refData = refMap.get(ref);
                        datum.ref = refData;
                    }
                    links.push(datum);
                }
            }
            if (obj === null || obj === void 0 ? void 0 : obj.tokens) {
                fetchLinks(obj.tokens);
            }
        }
    };
    fetchLinks(tokens);
    return Promise.resolve(links);
});
exports.parser = (md, tokens, format) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const links = yield processTokens(tokens);
        return links.length > 0
            ? yield exports.processLinks(links).then((links) => utils_1.mutateMd(md, links, format))
            : md;
    }
    catch (err) {
        console.log(err);
    }
});
exports.app = (md, format) => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = marked.lexer(md);
    exports.parser(md, tokens, format)
        .then(res => console.log(res));
});
