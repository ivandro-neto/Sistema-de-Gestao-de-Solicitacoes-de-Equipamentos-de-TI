import request from 'supertest';
import app from '../index';

describe('Testes de Técnicos', () => {
  let tecnicoId: number;

  test('Deve criar um novo técnico', async () => {
    const res = await request(app).post('/api/tecnicos').send({
      usuarioId: 1,
      especialidade: 'Montagem de Computadores',
      status: 'Disponivel'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    tecnicoId = res.body.id;
  });

  test('Deve listar todos os técnicos', async () => {
    const res = await request(app).get('/api/tecnicos');
    expect(res.status).toBe(200);
  });

  test('Deve buscar um técnico pelo ID', async () => {
    const res = await request(app).get(`/api/tecnicos/${tecnicoId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('especialidade', 'Montagem de Computadores');
  });

  test('Deve excluir um técnico', async () => {
    const res = await request(app).delete(`/api/tecnicos/${tecnicoId}`);
    expect(res.status).toBe(200);
  });
});
