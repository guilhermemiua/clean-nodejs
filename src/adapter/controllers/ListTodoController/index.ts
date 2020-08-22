import { ListTodoUseCase } from "../../../application/useCases/ListTodoUseCase"
import { IHttpRequest } from "../../../infra/interfaces/HttpRequest"
import { IHttpResponse } from "../../../infra/interfaces/HttpResponse"

export class ListTodoController {

  public ListTodoUseCase: ListTodoUseCase

  constructor(ListTodoUseCase: ListTodoUseCase) {
    this.ListTodoUseCase = ListTodoUseCase
  }
   
  async handle(request: IHttpRequest, response: IHttpResponse): Promise<IHttpResponse> {
    try {
      const { completed, offset, limit } = request.query

      let params = {}

      if (offset && limit) {
        params = {
          ...params,
          offset: parseInt(offset as string), 
          limit: parseInt(limit as string) 
        }
      }

      if (completed) {
        params = {
          ...params,
          completed: completed as string, 
        }
      }

      const todoList = await this.ListTodoUseCase.execute({ 
        ...params
      })

      return response.status(200).send(todoList)
    } catch(error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}