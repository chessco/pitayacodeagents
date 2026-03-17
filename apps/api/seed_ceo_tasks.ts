import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- 🚀 Cargando Tareas del CEO ---');

  const tenantId = 'pitayacode';

  // 1. Crear Agente CEO
  const agent = await prisma.agent.upsert({
    where: { id: 'agent-ceo' },
    update: {},
    create: {
      id: 'agent-ceo',
      tenantId: tenantId,
      name: 'CEO PitayaCode',
      role: 'ceo',
      status: 'Idle',
    },
  });
  console.log('✅ Agente CEO verificado:', agent.id);

  // 2. Crear Tareas
  const tasks = [
    { id: '1', title: 'Revisión de Métricas de Rendimiento Q1', description: 'Analizar ventas y KPIs de servidores' },
    { id: '3', title: 'Aprobación de Presupuesto Infraestructura', description: 'Revisar costos de AWS y balance' },
    { id: '4', title: 'Planificación de RoadMap de Producto 2026', description: 'Definir pilares estratégicos de la empresa' },
  ];

  for (const t of tasks) {
    await prisma.task.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        tenantId: tenantId,
        agentOwnerId: agent.id,
        title: t.title,
        description: t.description,
        status: 'Pending',
        priority: t.id === '1' || t.id === '3' ? 'High' : 'Medium',
      },
    });
    console.log(`✅ Tarea ID "${t.id}" creada.`);
  }

  console.log('\n--- 🎉 Carga de Tareas Finalizada ---');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
