// src/controllers/historicoController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getHistorico = async (req: Request, res: Response): Promise<void> => {
  try {
    const historico = await prisma.historicoSolicitacoes.findMany({
      include: { solicitacao: true }
    });
    res.json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};

export const getHistoricoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const historico = await prisma.historicoSolicitacoes.findUnique({
      where: { id},
      include: { solicitacao: true }
    });
    if (historico) res.json(historico);
    else res.status(404).json({ error: 'Histórico não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};

export const createHistorico = async (req: Request, res: Response): Promise<void> => {
  const { solicitacaoId, statusAnterior, statusNovo } = req.body;
  try {
    const newHistorico = await prisma.historicoSolicitacoes.create({
      data: { solicitacaoId, statusAnterior, statusNovo }
    });
    res.status(201).json(newHistorico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar histórico' });
  }
};

export const deleteHistorico = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.historicoSolicitacoes.delete({ where: { id} });
    res.json({ message: 'Histórico removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover histórico' });
  }
};
