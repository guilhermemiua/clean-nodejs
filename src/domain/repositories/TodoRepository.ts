import { Todo } from '../entities/Todo'

interface ITodoRepository {
  findById(id: number): Promise<Todo>
  findAll(params: { completed: string, offset: number, limit: number }): Promise<Todo[]>
  create(todo: Todo): Promise<void>
  update(todo: Todo): Promise<void>
  delete(id: number): Promise<void>
}

export { ITodoRepository }