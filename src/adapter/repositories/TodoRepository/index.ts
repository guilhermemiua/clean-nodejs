import { ITodoRepository } from "../../../domain/repositories/TodoRepository";
import { Todo } from "../../../domain/entities/Todo";
import { knex } from "../../../infra/database/knex";

export class TodoRepository implements ITodoRepository {
  async findById(id: number): Promise<Todo> {
    return await knex
      .select('id', 'description')
      .from('todos')
      .where('id', id)
  }

  async findAll(params: { completed: string, offset: number, limit: number }): Promise<Todo[]> {
    const { completed, offset = 0, limit = 100 } = params
    
    if (completed) {
      if (completed === 'false') {
        return await knex
          .select('id', 'description', 'completed')
          .from('todos')
          .where('completed', false)
          .offset(offset)
          .limit(limit)

      } else if (completed === 'true') {
        return await knex
          .select('id', 'description', 'completed')
          .from('todos')
          .where('completed', true)
          .offset(offset)
          .limit(limit)
      }
    }

    return await knex
      .select('id', 'description', 'completed')
      .from('todos')
      .offset(offset)
      .limit(limit)
  }

  async create(todo: Todo): Promise<void> {
    await knex('todos')
      .insert({
        description: todo.description,
        completed: todo.completed
      })
  }

  async update(todo: Todo): Promise<void> {
    await knex('todos')
      .where('id', todo.id)
      .update({
        description: todo.description,
        completed: todo.completed
      })
  }

  async delete(id: number): Promise<void> {
    await knex('todos')
      .where('id', id)
      .delete() 
  }
}