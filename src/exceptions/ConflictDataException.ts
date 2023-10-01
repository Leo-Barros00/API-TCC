export default class ConflictDataException extends Error {
  statusCode: number

  constructor(message?: string) {
    super(message ?? 'Dados conflitantes')
    this.statusCode = 409
    this.name = 'ConflictDataException'
    Object.setPrototypeOf(this, ConflictDataException.prototype)
  }
}
