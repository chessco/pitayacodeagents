import { Task } from './task.entity';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  create(task: Partial<Task>): Promise<Task>;
  update(id: string, update: Partial<Task>): Promise<Task>;
}
