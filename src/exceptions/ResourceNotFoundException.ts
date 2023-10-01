export default class ResourceNotFoundException extends Error {
  statusCode: number = 404

  constructor(message?: string) {
    super(message ?? 'Recurso não encontrado')
    this.statusCode = 404
    this.name = 'ResourceNotFoundException'
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}
