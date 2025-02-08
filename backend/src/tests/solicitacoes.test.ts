import request from 'supertest';
import app from '../index';

describe('Testes de Solicitações', () => {
  let solicitacaoId: number;

  test('Deve criar uma nova solicitação', async () => {
    const res = await request(app).post('/api/solicitacoes').send({
      solicitanteId: 1,
      descricao: 'Montagem de computador',
      equipamentoId: 2
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('solicitacao');
    solicitacaoId = res.body.solicitacao.id;
  });

  test('Deve listar todas as solicitações', async () => {
    const res = await request(app).get('/api/solicitacoes');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Deve buscar uma solicitação pelo ID', async () => {
    const res = await request(app).get(`/api/solicitacoes/${solicitacaoId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('descricao', 'Montagem de computador');
  });

  test('Deve atualizar o status de uma solicitação', async () => {
    const res = await request(app).patch(`/api/solicitacoes/${solicitacaoId}/status`).send({
      status: 'Concluída'
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Concluída');
  });

  test('Deve excluir uma solicitação', async () => {
    const res = await request(app).delete(`/api/solicitacoes/${solicitacaoId}`);
    expect(res.status).toBe(200);
  });
});
