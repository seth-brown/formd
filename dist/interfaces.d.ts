export declare type Ref = {
    key: string;
    href: string;
    title: string;
};
export declare type Format = 'reference' | 'inline';
export declare type Token = {
    type: string;
    raw: string;
    href: string;
    title: string | null;
    text: string;
    tokens: Token[];
};
export interface TokenArray extends Array<Token> {
    links?: any;
}
export declare type Link = {
    class: string;
    match: string;
    href: string;
    title: string;
    text: string;
    ref: Ref;
};
export interface LinkArray extends Array<Link> {
}
export declare type MarkdownLink = {
    match: string;
    class: string;
    bodyRef: string;
    bodyInl: string;
    appnRef: string;
    ref: Ref;
};
export interface MarkdownArray extends Array<MarkdownLink> {
}
