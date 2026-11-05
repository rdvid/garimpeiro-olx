export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'agora'
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.round(hours / 24)
  return `há ${days} d`
}

export function pricePosition(
  price: number,
  band: { min: number; max: number }
): 'below' | 'in' | 'above' {
  if (price < band.min) return 'below'
  if (price > band.max) return 'above'
  return 'in'
}

export function locationLabel(criteria: {
  uf: string
  zona?: string
  cidade?: string
}) {
  const parts = [
    criteria.cidade?.trim(),
    criteria.zona?.trim(),
    criteria.uf.toUpperCase(),
  ].filter(Boolean)
  return parts.join(' · ')
}
