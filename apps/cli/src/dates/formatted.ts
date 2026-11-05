import { format } from 'date-fns'

const dateString = 'dd/MM/yyyy'
const hourString = 'HH:mm'

export const formattedDate = (date: Date) => format(date, dateString)

export const formattedHour = (date: Date) => format(date, hourString)

export const formattedFullDate = (date: Date, separator = '-') =>
  format(date, `${dateString} ${separator} ${hourString}`)
