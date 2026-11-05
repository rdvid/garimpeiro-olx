export class InvalidSearchUrlError extends Error {
  readonly href: string

  constructor(href: string) {
    super(`O endereço ${href} não é válido, tente novamente com outros valores`)
    this.name = 'InvalidSearchUrlError'
    this.href = href
  }
}
