export default class UnauthorizedException extends Error {
  statusCode: number = 404

  constructor(message?: string) {
    super(message ?? 'Não Autorizado')
    this.statusCode = 401
    this.name = 'UnauthorizedException'
    Object.setPrototypeOf(this, UnauthorizedException.prototype)
  }
}
