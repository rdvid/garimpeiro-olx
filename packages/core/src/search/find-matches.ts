import type { ScrapeRequest } from '../types/search-config.js'
import { priceMatches } from '../price-matches.js'
import { scrapeAdsFromPages } from '../scraping/scrape-pages.js'
import type { Ad } from '../scraping/ads-extractor.js'

export function findMatchingAds(
  documents: Document[],
  request: ScrapeRequest
): Ad[] {
  const scrapedAdsMap = scrapeAdsFromPages(documents)
  const matches = new Set<Ad>()

  scrapedAdsMap.forEach((ads) =>
    ads.forEach((ad) => {
      if (priceMatches(request.price, ad.price, request.percentage)) {
        matches.add(ad)
      }
    })
  )

  return [...matches]
}
