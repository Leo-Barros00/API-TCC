import express, { Express } from "express"

class Server {
  private app: Express
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`> Listening sever on port ${this.port}`)
    })
  }
}

export default Server