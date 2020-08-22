import { ITodoRepository } from '../../../domain/repositories/TodoRepository'
import { Todo } from '../../../domain/entities/Todo'
import { CreateTodoRequestDTO} from '../../dtos/CreateTodoDTO'

export class CreateTodoUseCase {

  public todoRepository: ITodoRepository

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data: CreateTodoRequestDTO): Promise<void> {
    const todo = new Todo(null, data.description, false)

    await this.todoRepository.create(todo)
  }
}