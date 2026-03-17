import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { openClawConfig } from './openclaw.config';
import { OpenClawTaskRequest, OpenClawWebhookPayload, OpenClawExecutionResult } from './openclaw.types';

@Injectable()
export class OpenClawService {
  private readonly logger = new Logger(OpenClawService.name);

  constructor(private readonly prisma: PrismaService) {}

  async dispatchTask(request: OpenClawTaskRequest): Promise<OpenClawExecutionResult> {
    const { taskId, agentId, instruction } = request;

    // 1. Validate task existence
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { agentOwner: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // 2. Format payload
    const resolvedAgentId = agentId || task.agentOwner.role;
    const payload: OpenClawWebhookPayload = {
      message: instruction || `Execute task ${taskId}: ${task.title}`,
      agentId: resolvedAgentId,
      name: 'Pitaya Pilot',
      sessionKey: `task:${taskId}`,
      wakeMode: 'now',
      deliver: false,
      token: openClawConfig.webhookSecret,
    };

    // 3. Dispatch to OpenClaw
    try {
      this.logger.log(`Dispatching Task ${taskId} to OpenClaw Agent ${resolvedAgentId}`);

      await this.prisma.task.update({
        where: { id: taskId },
        data: {
          executionMode: 'OpenClaw',
          executionStatus: 'dispatched',
          executionTarget: resolvedAgentId,
          openclawSessionKey: payload.sessionKey,
        },
      });

      const response = await fetch(`${openClawConfig.baseUrl}${openClawConfig.webhookPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openClawConfig.webhookSecret}`,
        },
        body: JSON.stringify(payload),
      });

      const resultText = await response.text();

      if (!response.ok) {
        throw new Error(`OpenClaw returned ${response.status}: ${resultText}`);
      }

      this.logger.log(`OpenClaw response for Task ${taskId}: ${resultText}`);

      await this.prisma.task.update({
        where: { id: taskId },
        data: {
          executionStatus: 'running',
          executionResult: 'Dispatched successfully',
        },
      });

      return {
        success: true,
        message: 'Task dispatched to OpenClaw successfully',
        data: resultText,
      };

    } catch (error) {
      this.logger.error(`Failed to dispatch Task ${taskId}: ${error.message}`);
      
      await this.prisma.task.update({
        where: { id: taskId },
        data: {
          executionStatus: 'failed',
          executionLog: error.message,
        },
      });

      return {
        success: false,
        message: `Dispatch failed: ${error.message}`,
      };
    }
  }
}
