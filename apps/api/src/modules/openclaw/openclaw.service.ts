import * as fs from 'fs';
import * as path from 'path';
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

    let task;
    if (!taskId || taskId === 'new') {
      // Auto-crear una tarea para el agente
      const tenant = await this.prisma.tenant.findFirst();
      const agent = await this.prisma.agent.findFirst({
        where: { role: agentId || 'marketing' }
      });

      if (!agent) throw new NotFoundException(`Agent with role ${agentId} not found`);

      task = await this.prisma.task.create({
        data: {
          title: instruction ? instruction.split('\n')[0].substring(0, 50) : 'Operación Autónoma',
          description: instruction || 'Ejecución lanzada desde consola',
          executionStatus: 'pending',
          tenantId: tenant?.id || 'pitayacode', // Fallback
          agentOwnerId: agent.id
        },
        include: { agentOwner: true }
      });
    } else {
      task = await this.prisma.task.findUnique({
        where: { id: taskId },
        include: { agentOwner: true },
      });
    }

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const currentTaskId = task.id; // Usar variable local para el restofn

    // 2. Format payload
    const resolvedAgentId = agentId || task.agentOwner.role;
    const payload: OpenClawWebhookPayload = {
      message: instruction || `Execute task ${currentTaskId}: ${task.title}`,
      agentId: resolvedAgentId,
      name: 'Pitaya Pilot',
      sessionKey: `task:${currentTaskId}`,
      wakeMode: 'now',
      deliver: false,
      token: openClawConfig.webhookSecret,
    };

    // 3. Dispatch to OpenClaw
    try {
      this.logger.log(`Dispatching Task ${currentTaskId} to OpenClaw Agent ${resolvedAgentId}`);

      await this.prisma.task.update({
        where: { id: currentTaskId },
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

      this.logger.log(`OpenClaw response for Task ${currentTaskId}: ${resultText}`);

      await this.prisma.task.update({
        where: { id: currentTaskId },
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
      this.logger.error(`Failed to dispatch Task ${currentTaskId}: ${error.message}`);
      
      await this.prisma.task.update({
        where: { id: currentTaskId },
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

  async getOperations() {
    const agentsDir = 'C:\\Users\\chess\\.openclaw\\agents';
    const operations: any[] = [];

    try {
      if (!fs.existsSync(agentsDir)) return [];
      const agents = fs.readdirSync(agentsDir);
      for (const agent of agents) {
        const sessionsPath = path.join(agentsDir, agent, 'sessions', 'sessions.json');
        if (fs.existsSync(sessionsPath)) {
          const sessionsData = JSON.parse(fs.readFileSync(sessionsPath, 'utf-8'));
          for (const key in sessionsData) {
            const sess = sessionsData[key];
            const isRunning = Date.now() - sess.updatedAt < 60000 * 5; // 5 min
            const parsedSessionKey = key.replace(`agent:${agent}:`, '');
            operations.push({
              id: sess.sessionId,
              name: parsedSessionKey === 'main' ? 'Sesión Principal' : parsedSessionKey,
              title: `Tarea en ejecución`,
              agent: agent.charAt(0).toUpperCase() + agent.slice(1),
              status: isRunning ? 'running' : 'idle',
              progress: isRunning ? 65 : 100, // Dummy
              duration: isRunning ? 'Ejecutando...' : 'Pausado',
              sessionKey: parsedSessionKey, // <-- Campo Clave
            });
          }
        }
      }
    } catch (e: any) {
      this.logger.error(`Error reading operations: ${e.message}`);
    }

    return operations;
  }

  async resumeSession(body: { sessionKey: string, agent: string, message?: string }): Promise<OpenClawExecutionResult> {
    const { sessionKey, agent, message } = body;
    
    const payload: OpenClawWebhookPayload = {
      message: message || 'Continuar procesamiento de la tarea',
      agentId: agent.toLowerCase(),
      name: 'Pitaya Pilot',
      sessionKey: sessionKey,
      wakeMode: 'now',
      deliver: false,
      token: openClawConfig.webhookSecret,
    };

    try {
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

      return { success: true, message: 'Session resumed successfully', data: resultText };
    } catch (error: any) {
      this.logger.error(`Error resuming session: ${error.message}`);
      throw error;
    }
  }

  async getAutomations() {
    const count = await this.prisma.client.automation.count();
    if (count === 0) {
      await this.prisma.client.automation.createMany({
        data: [
          { tenantId: 'pitayacode', name: 'Sincronizador Notificaciones TFJA', type: 'Cron', trigger: 'Cada 30 min', agent: 'Auditor Legal', successRate: 98.5, lastRun: 'Hace 5 min', status: 'Active' },
          { tenantId: 'pitayacode', name: 'Extracción Datos de PDF Contratos', type: 'Webhook', trigger: 'Carga de Archivos', agent: 'Analista de Riesgo', successRate: 95.0, lastRun: 'Ayer, 18:30', status: 'Active' },
          { tenantId: 'pitayacode', name: 'Reporte Métricas API Semanal', type: 'Cron', trigger: 'Lunes 9:00 AM', agent: 'CEO Assistant', successRate: null, lastRun: 'Nunca', status: 'Draft' }
        ]
      });
    }
    return this.prisma.client.automation.findMany({
      where: { tenantId: 'pitayacode' }
    });
  }

  async createAutomation(data: any) {
    return this.prisma.client.automation.create({
      data: {
        ...data,
        tenantId: 'pitayacode'
      }
    });
  }

  async executeAutomation(id: string) {
    const automation = await this.prisma.client.automation.findUnique({ where: { id } });
    if (!automation) {
       throw new Error(`Automation with ID ${id} not found`);
    }

    const payload = {
      message: `Ejecutar tarea programada: ${automation.name}. Disparador: ${automation.trigger}`,
      agentId: automation.agent.toLowerCase().replace(' ', '-'),
      name: 'Flow Trigger',
      sessionKey: `task:auto-${id}`,
      wakeMode: 'now' as const,
      deliver: false,
      token: openClawConfig.webhookSecret,
    };

    try {
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

      return this.prisma.client.automation.update({
        where: { id },
        data: {
          lastRun: 'Hace un momento',
          status: 'Active'
        }
      });
    } catch (error: any) {
      this.logger.error(`Failed to trigger automation ${id}: ${error.message}`);
      throw error;
    }
  }

  async updateAutomationStatus(id: string, status: string) {
    return this.prisma.client.automation.update({
      where: { id },
      data: { status }
    });
  }
}
