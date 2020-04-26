export type Ref = {
  key: string
  href: string
  title: string
}

export type Format = 'reference' | 'inline'

export type Token = {
  type: string
  raw: string
  href: string | null
  title: string | null
  text: string | null
  items: Token[]
  tokens: Token[]
}

export interface TokenArray extends Array<Token>{links?:any}

type ListItem = {
  tokens: Token[]
}

export interface Link {
  class: string
  match: string
  href: string
  title: string | null
  text: string
  ref: Ref
}

export interface LinkArray extends Array<Link>{}

export type MarkdownLink = {
    match: string
  , class: string
  , bodyRef: string
  , bodyInl: string
  , appnRef: string
  , ref: Ref
  }

export interface MarkdownArray extends Array<MarkdownLink>{}
