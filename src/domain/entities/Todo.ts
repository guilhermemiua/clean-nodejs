export class Todo {

  public id: number
  public description: string
  public completed: boolean

  constructor(id: number, description: string, completed: boolean) {
    this.id = id
    this.description = description    
    this.completed = completed
  }
}
