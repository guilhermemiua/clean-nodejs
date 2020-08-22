import { DeleteTodoUseCase } from "../../../application/useCases/DeleteTodoUseCase"
import { IHttpRequest } from "../../../infra/interfaces/HttpRequest"
import { IHttpResponse } from "../../../infra/interfaces/HttpResponse"

export class DeleteTodoController {

  public deleteTodoUseCase: DeleteTodoUseCase

  constructor(deleteTodoUseCase: DeleteTodoUseCase) {
    this.deleteTodoUseCase = deleteTodoUseCase
  }
   
  async handle(request: IHttpRequest, response: IHttpResponse): Promise<IHttpResponse> {
    try {
      const { id } = request.params

      await this.deleteTodoUseCase.execute({ id: parseInt(id) })

      return response.status(200).send({
        message: "Deleted."
      })
    } catch(error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}