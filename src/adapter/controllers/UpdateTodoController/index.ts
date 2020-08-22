import { UpdateTodoUseCase } from "../../../application/useCases/UpdateTodoUseCase"
import { IHttpRequest } from "../../../infra/interfaces/HttpRequest"
import { IHttpResponse } from "../../../infra/interfaces/HttpResponse"

export class UpdateTodoController {

  public updateTodoUseCase: UpdateTodoUseCase

  constructor(updateTodoUseCase: UpdateTodoUseCase) {
    this.updateTodoUseCase = updateTodoUseCase
  }
   
  async handle(request: IHttpRequest, response: IHttpResponse): Promise<IHttpResponse> {
    try {
      const { id } = request.params
      const { description, completed } = request.body

      if (!id) {
        return response.status(400).send({
          message: "Id not provided."
        })
      }

      if (!description) {
        return response.status(400).send({
          message: "Description not provided."
        })
      }
      
      if (!(typeof completed === 'boolean')) {
        return response.status(400).send({
          message: "Completed not provided."
        })
      }

      await this.updateTodoUseCase.execute({ id: parseInt(id), description, completed })

      return response.status(200).send({
        message: "Updated."
      })
    } catch(error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}