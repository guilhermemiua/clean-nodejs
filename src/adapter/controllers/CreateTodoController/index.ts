import { CreateTodoUseCase } from "../../../application/useCases/CreateTodoUseCase"
import { IHttpRequest } from "../../../infra/interfaces/HttpRequest"
import { IHttpResponse } from "../../../infra/interfaces/HttpResponse"

export class CreateTodoController {

  public createTodoUseCase: CreateTodoUseCase

  constructor(createTodoUseCase: CreateTodoUseCase) {
    this.createTodoUseCase = createTodoUseCase
  }
   
  async handle(request: IHttpRequest, response: IHttpResponse): Promise<IHttpResponse> {
    try {
      const { description } = request.body

      if (!description) {
        return response.status(400).send({
          message: "Description not provided."
        })
      }

      await this.createTodoUseCase.execute({ description })

      return response.status(201).send({
        message: "Created."
      })
    } catch(error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}