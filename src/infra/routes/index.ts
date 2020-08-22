import { Router } from 'express'

import TodoRoutes from './TodoRoutes'

class Routes {
  public routes: Router

  constructor() {
    this.routes = Router()
    this.initRoutes()
  }

  public initRoutes(): void {
    this.routes.use(TodoRoutes)
  }
}

export default new Routes().routes