import { buildSearchUrls } from '../urls/build-urls.js'
import { fetchSearchPages } from '../fetch/fetch-pages.js'
import { findMatchingAds } from './find-matches.js'
import { scrapeAdsFromPages } from '../scraping/scrape-pages.js'
import { getPriceBand, type PriceBand } from '../price-matches.js'
import type { ScrapeRequest } from '../types/search-config.js'
import type { Ad } from '../scraping/ads-extractor.js'

export type ScrapeResult = {
  matches: Ad[]
  scraped: Ad[]
  priceBand: PriceBand
}

export async function runScrape(request: ScrapeRequest): Promise<ScrapeResult> {
  const urls = buildSearchUrls(request)
  const documents = await fetchSearchPages(urls)
  const scraped = [...scrapeAdsFromPages(documents).values()].flat()
  const matches = findMatchingAds(documents, request)

  return {
    matches,
    scraped,
    priceBand: getPriceBand(request.price, request.percentage),
  }
}
