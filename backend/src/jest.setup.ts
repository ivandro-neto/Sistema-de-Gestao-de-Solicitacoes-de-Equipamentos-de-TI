import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log('Iniciando testes...');
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log('Finalizando testes...');
});
