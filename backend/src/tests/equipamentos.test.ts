import request from "supertest";
import app from "../index"; // Certifique-se de importar a instância do seu Express app

describe("Testes de Equipamentos", () => {
  let equipamentoId: number;

  beforeAll(async () => {
    // Criar um equipamento para ser usado nos testes
    const res = await request(app)
      .post("/equipamentos")
      .send({ nome: "Computador", descricao: "Equipamento de TI" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    equipamentoId = res.body.id;
    console.log(`✅ Equipamento criado com ID: ${equipamentoId}`);
  });

  test("Deve buscar um equipamento pelo ID", async () => {
    const res = await request(app).get(`/equipamentos/${equipamentoId}`);
    console.log("🔍 Buscando equipamento:", res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", equipamentoId);
  });

  test("Deve atualizar um equipamento", async () => {
    const res = await request(app)
      .put(`/equipamentos/${equipamentoId}`)
      .send({ nome: "Notebook", descricao: "Equipamento atualizado" });

    console.log("🛠️ Atualizando equipamento:", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", equipamentoId);
    expect(res.body.nome).toBe("Notebook");
  });

  test("Deve remover um equipamento", async () => {
    const res = await request(app).delete(`/equipamentos/${equipamentoId}`);
    console.log("🗑️ Removendo equipamento:", res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Equipamento removido com sucesso");
  });

  test("Deve retornar erro ao remover equipamento inexistente", async () => {
    const res = await request(app).delete(`/equipamentos/${equipamentoId}`);
    console.log("⚠️ Tentando remover equipamento novamente:", res.body);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Este equipamento não existe.");
  });
});
