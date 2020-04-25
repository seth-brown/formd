import { Format, MarkdownArray } from './interfaces';
export declare const appnRefRe: (ref: string) => RegExp;
export declare const getReferenceKey: (text: string) => string;
export declare const classifyLink: (text: string) => string | null;
export declare const mutateMd: (md: string, links: MarkdownArray, format: Format) => Promise<string>;
