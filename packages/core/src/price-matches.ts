export type PriceBand = {
  min: number
  max: number
}

export function getPriceBand(price: number, percentage: number): PriceBand {
  const parsedPercentage = percentage > 100 ? 0 : percentage / 100

  if (parsedPercentage === 0) {
    return { min: price, max: price }
  }

  const delta = price * parsedPercentage
  return {
    min: Math.round(price - delta),
    max: Math.round(price + delta),
  }
}

export function priceMatches(
  priceFromArgs: number,
  toCompare: number,
  percentage: number
): boolean {
  const { min, max } = getPriceBand(priceFromArgs, percentage)
  return toCompare >= min && toCompare <= max
}
