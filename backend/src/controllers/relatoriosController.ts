// src/controllers/relatoriosController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getRelatorios = async (req: Request, res: Response): Promise<void> => {
  try {
    const relatorios = await prisma.relatorio.findMany();
    res.json(relatorios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar relatórios' });
  }
};

export const getRelatorioById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const relatorio = await prisma.relatorio.findUnique({ where: { id: Number.parseInt(id) } });
    if (relatorio) res.json(relatorio);
    else res.status(404).json({ error: 'Relatório não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
};

export const createRelatorio = async (req: Request, res: Response): Promise<void> => {
  const { tipoRelatorio, conteudo } = req.body;
  try {
    const newRelatorio = await prisma.relatorio.create({
      data: { tipoRelatorio, conteudo }
    });
    res.status(201).json(newRelatorio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar relatório' });
  }
};

export const deleteRelatorio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.relatorio.delete({ where: { id: Number.parseInt(id) } });
    res.json({ message: 'Relatório removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover relatório' });
  }
};
