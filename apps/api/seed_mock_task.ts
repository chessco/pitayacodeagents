import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- 🚀 Iniciando Carga de Datos de Prueba ---');

  // 1. Crear o actualizar Tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: 'pitayacode' },
    update: {},
    create: {
      id: 'pitayacode',
      name: 'Pitaya Pilot',
      status: 'Active',
    },
  });
  console.log('✅ Tenant verificado:', tenant.id);

  // 2. Crear un Agente
  const agent = await prisma.agent.upsert({
    where: { id: 'agent-marketing' },
    update: {},
    create: {
      id: 'agent-marketing',
      tenantId: 'pitayacode',
      name: 'Gerente Marketing',
      role: 'marketing',
      status: 'Idle',
    },
  });
  console.log('✅ Agente creado:', agent.id);

  // 3. Crear el Task con el ID que espera la Interfaz ("2")
  const task = await prisma.task.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2', 
      tenantId: 'pitayacode',
      agentOwnerId: 'agent-marketing',
      title: 'Diseño de Interfaz UX',
      description: 'Crear vistas de dashboard corporativo',
      status: 'Pending',
      priority: 'Media',
    },
  });
  console.log('✅ Tarea ID "2" creada satisfactoriamente!');

  console.log('\n--- 🎉 Proceso Terminado ---');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
