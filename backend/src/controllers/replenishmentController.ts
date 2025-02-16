import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReplenishmentOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // Busca todos os EquipmentComponent com componente incluído
    const allEC = await prisma.equipmentComponent.findMany({
      include: { componente: true }
    });
    // Filtra os registros em que a quantidade disponível é menor que a quantidade necessária
    const orders = allEC.filter(ec => ec.componente.quantidadeDisponivel < ec.quantidadeNecessaria)
      .map(ec => ({
        equipmentComponentId: ec.id,
        equipamentoId: ec.equipamentoId,
        componenteId: ec.componente.id,
        componenteNome: ec.componente.nome,
        quantidadeNecessaria: ec.quantidadeNecessaria,
        quantidadeDisponivel: ec.componente.quantidadeDisponivel,
        falta: ec.quantidadeNecessaria - ec.componente.quantidadeDisponivel
      }));
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedidos de reposição." });
  }
};

export const updateComponentStock = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // id do componente
  const { novaQuantidade } = req.body;
  try {
    const updatedComponent = await prisma.componente.update({
      where: { id },
      data: { quantidadeDisponivel: novaQuantidade }
    });
    res.json(updatedComponent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o estoque do componente." });
  }
};
