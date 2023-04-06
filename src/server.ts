import express, { Express } from "express"
import log, { LogType } from "./utils/log"

class Server {
  private app: Express
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port

    this.configure()
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public start() {
    this.app.listen(this.port, () => {
      log(LogType.SUCCESS, 'START', `Listening sever on port ${this.port}`)
    })
  }
}

export default Server