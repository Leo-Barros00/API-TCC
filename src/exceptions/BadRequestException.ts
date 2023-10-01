export default class BadRequestException extends Error {
  statusCode: number

  constructor(message?: string) {
    super(message ?? 'Requisição Inválida')
    this.statusCode = 400
    this.name = 'BadRequestException'
    Object.setPrototypeOf(this, BadRequestException.prototype)
  }
}
