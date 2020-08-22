import { ITodoRepository } from '../../../domain/repositories/TodoRepository'
import { Todo } from '../../../domain/entities/Todo'
import { UpdateTodoRequestDTO} from '../../dtos/UpdateTodoDTO'

export class UpdateTodoUseCase {

  public todoRepository: ITodoRepository

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data: UpdateTodoRequestDTO): Promise<void> {
    const todo = new Todo(data.id, data.description, data.completed)

    await this.todoRepository.update(todo)
  }
}