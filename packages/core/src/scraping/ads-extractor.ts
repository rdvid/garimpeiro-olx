import { isEmpty } from '../utils/is-empty.js'

export type Ad = {
  title: string
  link: string
  price: number
}

export type Ads = Ad[]

function parsePrice(priceString: string): number | null {
  if (isEmpty(priceString)) return null
  let price = Number(priceString.replace(/\D+/g, ''))
  if (Number.isNaN(price)) return null
  if (priceString.includes(',')) price /= 100
  return price
}

/** Current OLX listing cards (listing-next). */
function extractFromAdCards(document: Document): Ads {
  const cards = Array.from(document.querySelectorAll('section.olx-adcard'))

  const ads = cards.map((card) => {
    const link = card.querySelector<HTMLAnchorElement>(
      'a.olx-adcard__link, [data-testid="adcard-link"]'
    )
    if (!link?.href) return

    const title =
      link.querySelector('h2')?.textContent?.trim() ||
      link.getAttribute('title')?.trim() ||
      ''
    if (isEmpty(title)) return

    const priceString =
      card.querySelector('.olx-adcard__price')?.textContent?.trim() || ''
    const price = parsePrice(priceString)
    if (price == null) return

    return { link: link.href, title, price }
  })

  return ads.filter(Boolean) as Ads
}

/** Legacy selector kept as fallback. */
function extractFromLegacyList(document: Document): Ads {
  const adsList = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('ul#ad-list li a')
  )

  const ads = adsList.map((ad) => {
    const children = Array.from(ad.children)[0]
    if (!children) return

    const title = children.querySelector('h2')?.textContent
    if (isEmpty(title)) return

    const priceArray = Array.from(
      children.querySelectorAll('div div div div p')
    ).filter((element) => element.textContent?.startsWith('R$'))
    if (priceArray.length === 0) return

    const priceString = priceArray[0].textContent
    const price = parsePrice(priceString || '')
    if (price == null) return

    return { link: ad.href, title: title!, price }
  })

  return ads.filter(Boolean) as Ads
}

export function extractAdsFromHtml(document: Document): Ads {
  const modern = extractFromAdCards(document)
  if (modern.length > 0) return modern
  return extractFromLegacyList(document)
}
