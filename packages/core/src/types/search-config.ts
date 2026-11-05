import type { UF } from '../choices/uf.js'
import type { Ordem } from '../choices/ordem.js'

/** Payload for a single scrape (API / GUI / CLI iteration). */
export type ScrapeRequest = {
  state: UF
  product: string
  region: string
  zone: string
  city: string
  order: Ordem
  price: number
  percentage: number
  pages: number
}
