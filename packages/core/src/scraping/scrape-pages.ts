import type { Ads } from './ads-extractor.js'
import { extractAdsFromHtml } from './ads-extractor.js'

export function scrapeAdsFromPages(pages: Document[]): Map<number, Ads> {
  const adsMap = new Map<number, Ads>()

  pages.forEach((page, index) => {
    adsMap.set(index + 1, extractAdsFromHtml(page))
  })

  return adsMap
}
