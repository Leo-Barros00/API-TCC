import { Request, Response, NextFunction } from 'express'
import log, { LogType, getStatusColoredByRequistionResult } from '../utils/log'

const NS_PER_SEC = 1e9
const NS_TO_MS = 1e6

class LoggerMiddleware {
  static handler(req: Request, res: Response, next: NextFunction) {
    const startTime = process.hrtime()

    res.on('finish', () => {
      const reqDuration = LoggerMiddleware.getRequestDuration(startTime).toLocaleString()
      const { method, url } = req
      const { statusCode } = res

      const statusCodeColored = getStatusColoredByRequistionResult(statusCode)

      log(LogType.INFO, 'REQ', `${method}:${url} ${statusCodeColored} ${reqDuration}ms`)

      // TO-DO: Implement error log in dev time
      // if (statusCode >= 400)
      //   log(LogType.ERROR, 'ERROR', `${req.error?.stack}`)
    })

    next()
  }

  static getRequestDuration(start: [number, number]): number {
    const diff = process.hrtime(start)
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
  }
}

export default LoggerMiddleware
