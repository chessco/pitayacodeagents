import { Injectable, Inject } from '@nestjs/common';
import type { ITaskRepository } from '../../../domain/tasks/task.repository';

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject('ITaskRepository') private readonly repo: ITaskRepository
  ) {}

  execute() { return this.repo.findAll(); }
}

