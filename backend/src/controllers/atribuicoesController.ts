// src/controllers/atribuicoesController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAtribuicoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const atribuicoes = await prisma.atribuicaoTecnico.findMany({
      include: { solicitacao: true, tecnico: { include: { usuario: true } } }
    });
    res.json(atribuicoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar atribuições' });
  }
};

export const getAtribuicaoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const atribuicao = await prisma.atribuicaoTecnico.findUnique({
      where: { id:  id },
      include: { solicitacao: true, tecnico: { include: { usuario: true } } }
    });
    if (atribuicao) res.json(atribuicao);
    else res.status(404).json({ error: 'Atribuição não encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar atribuição' });
  }
};

export const getAtribuicaoByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const atribuicao = await prisma.atribuicaoTecnico.findMany({
      where: { tecnico: {usuarioId : id} },
      include: { solicitacao: true, tecnico: { include: { usuario: true } } }
    });
    if (atribuicao) res.json(atribuicao);
    else res.status(404).json({ error: 'Atribuição não encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar atribuição' });
  }
};

export const createAtribuicao = async (req: Request, res: Response): Promise<void> => {
  const { solicitacaoId, tecnicoId } = req.body;
  try {
    const newAtribuicao = await prisma.atribuicaoTecnico.create({
      data: { solicitacaoId, tecnicoId }
    });
    res.status(201).json(newAtribuicao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar atribuição' });
  }
};

export const deleteAtribuicao = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.atribuicaoTecnico.delete({ where: { id} });
    res.json({ message: 'Atribuição removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover atribuição' });
  }
};
