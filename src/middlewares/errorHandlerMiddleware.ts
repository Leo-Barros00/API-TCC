import { NextFunction, Request, Response } from 'express'

class ErrorHandlerMiddleware {
  static handler(error: any, _1: Request, res: Response, _2: NextFunction) {
    const status = error.statusCode || 500
    const message = error.message || 'Erro interno no servidor'

    res.status(status).json({
      status: 'error',
      message,
    })
  }
}

export default ErrorHandlerMiddleware
