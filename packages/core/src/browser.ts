/** Browser-safe exports (choices and types only — no Node scraping stack). */
export { default as ufs, type UF } from './choices/uf.js'
export { default as ddds, type DDD } from './choices/ddd.js'
export { default as ordens, type Ordem } from './choices/ordem.js'
export type { Ad } from './scraping/ads-extractor.js'
export type { ScrapeRequest } from './types/search-config.js'
