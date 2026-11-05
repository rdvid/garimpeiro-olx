import notifier from 'node-notifier'

import { getMessage, getTitle } from '@/notifications/shared.js'

export const desktopNotification = (
  product: string,
  price: number,
  linkToOpen: string
) =>
  notifier.notify({
    title: getTitle({ showProgramName: true }),
    message: getMessage(product, price),
    open: linkToOpen,
    wait: true,
  })
