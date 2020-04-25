import { Format, TokenArray, LinkArray, MarkdownArray } from './interfaces';
export declare const processLinks: (links: LinkArray) => Promise<MarkdownArray>;
export declare const parser: (md: any, tokens: TokenArray, format: Format) => Promise<any>;
export declare const app: (md: any, format: Format) => Promise<void>;
