import express from 'express'
import cors from 'cors'
import routes from '../routes'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.applyMiddlewares()
    this.initRoutes()
  }

  private applyMiddlewares(): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(cors())
  }

  private initRoutes(): void {
    this.express.use(routes)
  }
}

export default new App().express