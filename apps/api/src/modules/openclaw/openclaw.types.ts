export interface OpenClawWebhookPayload {
  message: string;
  agentId: string;
  name: string;
  sessionKey: string;
  wakeMode: string;
  deliver: boolean;
  token?: string;
}

export class OpenClawTaskRequest {
  taskId: string;
  agentId?: string;
  instruction: string;
}

export interface OpenClawExecutionResult {
  success: boolean;
  message: string;
  data?: any;
}
