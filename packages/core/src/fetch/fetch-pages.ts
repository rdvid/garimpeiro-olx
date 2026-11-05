import { gotScraping } from 'got-scraping'
import { JSDOM } from 'jsdom'

import { InvalidSearchUrlError } from '../errors.js'

const headerGeneratorOptions = {
  browsers: [{ name: 'chrome' as const, minVersion: 120 }],
  devices: ['desktop' as const],
  locales: ['pt-BR', 'en-US'],
  operatingSystems: ['windows' as const],
}

/**
 * Fetches listing HTML with browser-like TLS/HTTP fingerprinting.
 * Plain `got`/`curl` hit Cloudflare 403; full Chromium is unnecessary.
 */
export async function fetchSearchPages(urls: URL[]): Promise<Document[]> {
  return Promise.all(
    urls.map(async (url) => {
      const href = url.href
      const response = await gotScraping({
        url: href,
        throwHttpErrors: false,
        headerGeneratorOptions,
      })

      const statusCode = response.statusCode

      if (statusCode === 404) {
        throw new InvalidSearchUrlError(href)
      }

      if (statusCode === 403) {
        throw new Error(
          `A OLX bloqueou a requisição (HTTP 403 / Cloudflare) para ${href}.`
        )
      }

      if (statusCode < 200 || statusCode >= 300) {
        throw new Error(
          `A OLX respondeu com HTTP ${statusCode} para ${href}. Tente novamente mais tarde.`
        )
      }

      return new JSDOM(response.body).window.document
    })
  )
}
