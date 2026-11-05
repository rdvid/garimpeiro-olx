import chalk from 'chalk'

import { formattedFullDate } from '../dates/formatted.js'
import { getFormatedPrice, getTitle } from './shared.js'

const { italic, bold, underline, blue, yellowBright, whiteBright } = chalk

export const logNotification = (
  product: string,
  price: number,
  link: string
) => {
  const styledTitle = yellowBright(getTitle({ text: 'OFERTA ENCONTRADA' }))
  const styledDate = whiteBright(formattedFullDate(new Date()))
  const styledMessage = `${product} por ${bold(getFormatedPrice(price))}`
  const styledLink = underline(italic(blue(link)))

  const line = '-'.repeat(styledTitle.length * 3 + 4)

  const log = `
  ${line}

    🔥 ${styledTitle}
    ⌚ ${styledDate}

    👉 ${styledMessage}
    🔗 ${styledLink}

  ${line}
  `

  console.log(log)
}
