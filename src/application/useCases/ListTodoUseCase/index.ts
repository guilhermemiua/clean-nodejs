import { Todo } from "../../../domain/entities/Todo";
import { ITodoRepository } from "../../../domain/repositories/TodoRepository";
import { ListTodoRequestDTO } from "../../../application/dtos/ListTodoDTO";

export class ListTodoUseCase {

  public todoRepository: ITodoRepository

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository
  }

  async execute(data: ListTodoRequestDTO): Promise<Todo[]> {
    return this.todoRepository.findAll({ 
      completed: data.completed,
      offset: data.offset,
      limit: data.limit
    })
  }
}