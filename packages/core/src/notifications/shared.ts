export const getTitle = ({
  text = '🔥 Oferta encontrada!!! 🔥',
  showProgramName = false,
}: {
  text?: string
  showProgramName?: boolean
}) => `${showProgramName ? 'Garimpeiro: ' : ''}${text}`

export const getFormatedPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

export const getMessage = (product: string, price: number) => {
  const formatedPrice = getFormatedPrice(price)
  return `${product} por ${formatedPrice}`
}
