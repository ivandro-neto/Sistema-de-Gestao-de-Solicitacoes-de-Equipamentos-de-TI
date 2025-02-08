// src/controllers/componentesController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getComponentes = async (req: Request, res: Response): Promise<void> => {
  try {
    const componentes = await prisma.componente.findMany();
    res.json(componentes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar componentes' });
  }
};

export const getComponenteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const componente = await prisma.componente.findUnique({
      where: { id: Number.parseInt(id) }
    });
    if (componente) res.json(componente);
    else res.status(404).json({ error: 'Componente não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar componente' });
  }
};

export const createComponente = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao, quantidadeDisponivel, unidadeMedida } = req.body;
  try {
    const newComponente = await prisma.componente.create({
      data: { nome, descricao, quantidadeDisponivel, unidadeMedida }
    });
    res.status(201).json(newComponente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar componente' });
  }
};

export const updateComponente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, descricao, quantidadeDisponivel, unidadeMedida } = req.body;
  try {
    const updatedComponente = await prisma.componente.update({
      where: { id: Number.parseInt(id) },
      data: { nome, descricao, quantidadeDisponivel, unidadeMedida }
    });
    res.json(updatedComponente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar componente' });
  }
};

export const deleteComponente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.componente.delete({ where: { id: Number.parseInt(id) } });
    res.json({ message: 'Componente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover componente' });
  }
};
