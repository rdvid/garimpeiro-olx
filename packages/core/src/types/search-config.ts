import type { UF } from '../choices/uf.js'
import type { Ordem } from '../choices/ordem.js'

export type NotificationChannels = {
  log: boolean
  desktop: boolean
}

export type SearchConfig = {
  state: UF
  product: string
  region: string
  zone: string
  city: string
  order: Ordem
  intervalMs: number
  price: number
  percentage: number
  pages: number
  stopOnMatch: boolean
  notifications: NotificationChannels
}

/** Payload for a single scrape (API / GUI) without polling options. */
export type ScrapeRequest = Pick<
  SearchConfig,
  | 'state'
  | 'product'
  | 'region'
  | 'zone'
  | 'city'
  | 'order'
  | 'price'
  | 'percentage'
  | 'pages'
>
