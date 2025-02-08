import request from 'supertest';
import app from '../index';

describe('Testes de Componentes', () => {
  let componenteId: number;

  test('Deve criar um novo componente', async () => {
    const res = await request(app).post('/api/componentes').send({
      nome: 'Memória RAM',
      descricao: '8GB DDR4',
      quantidadeDisponivel: 10,
      unidadeMedida: 'unidade'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    componenteId = res.body.id;
  });

  test('Deve listar todos os componentes', async () => {
    const res = await request(app).get('/api/componentes');
    expect(res.status).toBe(200);
  });

  test('Deve atualizar um componente', async () => {
    const res = await request(app).put(`/api/componentes/${componenteId}`).send({
      quantidadeDisponivel: 5
    });

    expect(res.status).toBe(200);
    expect(res.body.quantidadeDisponivel).toBe(5);
  });

  test('Deve excluir um componente', async () => {
    const res = await request(app).delete(`/api/componentes/${componenteId}`);
    expect(res.status).toBe(200);
  });
});
