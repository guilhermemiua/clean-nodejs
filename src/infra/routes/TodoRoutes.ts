import { Router, Request, Response } from 'express'
import { ITodoRepository } from '../../domain/repositories/TodoRepository'
import { TodoRepository } from '../../adapter/repositories/TodoRepository'
import { CreateTodoController } from '../..//adapter/controllers/CreateTodoController'
import { CreateTodoUseCase } from '../../application/useCases/CreateTodoUseCase'
import { ListTodoController } from '../..//adapter/controllers/ListTodoController'
import { ListTodoUseCase } from '../../application/useCases/ListTodoUseCase'
import { DeleteTodoController } from '../..//adapter/controllers/DeleteTodoController'
import { DeleteTodoUseCase } from '../../application/useCases/DeleteTodoUseCase'
import { UpdateTodoController } from '../..//adapter/controllers/UpdateTodoController'
import { UpdateTodoUseCase } from '../../application/useCases/UpdateTodoUseCase'

class TodoRoutes {
  public routes: Router

  private todoRepository: ITodoRepository

  private createTodoUseCase: CreateTodoUseCase 
  private listTodoUseCase: ListTodoUseCase 
  private deleteTodoUseCase: DeleteTodoUseCase 
  private updateTodoUseCase: UpdateTodoUseCase 

  private createTodoController: CreateTodoController 
  private listTodoController: ListTodoController
  private deleteTodoController: DeleteTodoController
  private updateTodoController: UpdateTodoController

  constructor() {
    this.routes = Router()
    
    this.todoRepository = new TodoRepository()

    this.createTodoUseCase = new CreateTodoUseCase(this.todoRepository)
    this.listTodoUseCase = new ListTodoUseCase(this.todoRepository)
    this.deleteTodoUseCase = new DeleteTodoUseCase(this.todoRepository)
    this.updateTodoUseCase = new UpdateTodoUseCase(this.todoRepository)

    this.createTodoController = new CreateTodoController(this.createTodoUseCase)
    this.listTodoController = new ListTodoController(this.listTodoUseCase) 
    this.deleteTodoController = new DeleteTodoController(this.deleteTodoUseCase)
    this.updateTodoController = new UpdateTodoController(this.updateTodoUseCase)

    this.initRoutes()
  }

  public initRoutes(): void {
   
    this.routes.get("/todo", (request: Request, response: Response) => {
      return this.listTodoController.handle(request, response)
    })

    this.routes.post("/todo", (request: Request, response: Response) => {
      return this.createTodoController.handle(request, response)
    })

    this.routes.delete("/todo/:id", (request: Request, response: Response) => {
      return this.deleteTodoController.handle(request, response)
    })

    this.routes.put("/todo/:id", (request: Request, response: Response) => {
      return this.updateTodoController.handle(request, response)
    })
  }
}

export default new TodoRoutes().routes