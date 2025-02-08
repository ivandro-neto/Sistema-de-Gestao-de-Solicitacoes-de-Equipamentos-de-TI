import { PrismaClient } from '@prisma/client';
import app from '../index';
import type { Server } from 'node:http';
import request from 'supertest';

const prisma = new PrismaClient();
let server: Server;

beforeAll(async () => {
  console.log('🔧 Configurando ambiente de testes...');
  const port = 4000 + Math.floor(Math.random() * 100);
  server = app.listen(port, () => console.log(`Test Server running on port ${port}`));

 /*  // Limpa os dados antigos antes dos testes
  await prisma.solicitation.deleteMany({});
  await prisma.usuario.deleteMany({});
  await prisma.tecnico.deleteMany({}); */
});

afterAll(async () => {
  console.log('🛑 Finalizando testes...');
  await prisma.$disconnect();
    if (server.listening) {
      server.close();
    }
});
