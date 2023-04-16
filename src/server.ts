import express, { Express } from 'express'
import ip from 'ip'

import getRoutes from './routes'
import LoggerMiddleware from './middlewares/loggerMiddleware'
import ErrorHandlerMiddleware from './middlewares/errorHandlerMiddleware'
import log, { LogType } from './utils/log'

class Server {
  private app: Express
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port

    this.configure()
    this.registerLogger()
    this.registerRoutes()
    this.registerErrorHandler()
  }

  private configure() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private registerLogger() {
    this.app.use(LoggerMiddleware.handler)
  }

  private registerErrorHandler() {
    this.app.use(ErrorHandlerMiddleware.handler)
  }

  private registerRoutes() {
    const routes = getRoutes()
    routes.forEach((route) => {
      this.app.use(route)
    })
  }

  private logNetworkInfo() {
    const localNetworkAddress = ip.address()
    log(LogType.INFO, 'INFO', `Local address:   http://127.0.0.1:${this.port}`)
    log(LogType.INFO, 'INFO', `Network address: http://${localNetworkAddress}:${this.port}`)
  }

  public start() {
    this.app.listen(this.port, () => {
      this.logNetworkInfo()
      log(LogType.SUCCESS, 'START', `Listening sever on port ${this.port}`)
    })
  }
}

export default Server
