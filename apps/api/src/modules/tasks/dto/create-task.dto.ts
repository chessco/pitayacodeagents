export class CreateTaskDto {
  title: string;
  description: string;
  agentOwnerId: string;
  priority?: string;
}
