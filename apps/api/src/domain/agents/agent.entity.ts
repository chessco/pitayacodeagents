export class Agent {
  id: string;
  tenantId: string;
  name: string;
  role: string;
  status: string;
  skills?: any;
  tasksPending: number;
  tasksCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}
