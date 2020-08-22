import { ITodoRepository } from '../../../domain/repositories/TodoRepository'
import { DeleteTodoRequestDTO} from '../../dtos/DeleteTodoDTO'

export class DeleteTodoUseCase {

  public todoRepository: ITodoRepository

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data: DeleteTodoRequestDTO): Promise<void> {
    await this.todoRepository.delete(data.id)
  }
}