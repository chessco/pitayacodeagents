import { Controller, Get } from '@nestjs/common';
import { GetTasksUseCase } from '../../../application/use-cases/tasks/get-tasks.usecase';

@Controller('tasks')
export class TasksController {
  constructor(private readonly getTasksUc: GetTasksUseCase) {}

  @Get()
  findAll() { return this.getTasksUc.execute(); }
}
