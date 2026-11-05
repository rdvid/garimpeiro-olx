export { default as ufs, type UF } from './choices/uf.js'
export { default as ddds, type DDD } from './choices/ddd.js'
export { default as ordens, type Ordem } from './choices/ordem.js'

export { type ScrapeRequest } from './types/search-config.js'

export { InvalidSearchUrlError } from './errors.js'
export { dddToRegion } from './regions/ddd-to-region.js'

export { buildSearchUrl, type UrlBuildParams } from './urls/url-parser.js'
export { buildSearchUrls } from './urls/build-urls.js'

export {
  type Ad,
  type Ads,
  extractAdsFromHtml,
} from './scraping/ads-extractor.js'
export { scrapeAdsFromPages } from './scraping/scrape-pages.js'
export { priceMatches, getPriceBand, type PriceBand } from './price-matches.js'

export { fetchSearchPages } from './fetch/fetch-pages.js'
export { findMatchingAds } from './search/find-matches.js'
export { runScrape, type ScrapeResult } from './search/run-scrape.js'
export {
  parseScrapeInput,
  type ScrapeBodyInput,
} from './search/parse-scrape-input.js'

export { kebabCase } from './utils/kebab-case.js'
