import request from 'supertest';
import app from '../index'; // Importa o servidor Express

describe('Testes de Usuários', () => {
  let usuarioId: number;

  test('Deve criar um novo usuário', async () => {
    const res = await request(app).post('/api/usuarios').send({
      nome: 'Teste Usuário',
      email: 'teste@teste.com',
      senhaHash: 'senha123',
      tipo: 'Solicitante'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    usuarioId = res.body.id;
  });

  test('Deve impedir a criação de um usuário com e-mail já existente', async () => {
    const res = await request(app).post('/api/usuarios').send({
      nome: 'Outro Teste',
      email: 'teste@teste.com',
      senhaHash: 'senha123',
      tipo: 'Solicitante'
    });

    expect(res.status).toBe(400);
  });

  test('Deve buscar um usuário pelo ID', async () => {
    const res = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'teste@teste.com');
  });

  test('Deve deletar um usuário', async () => {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.status).toBe(200);
  });
});
