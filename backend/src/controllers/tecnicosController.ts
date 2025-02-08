// src/controllers/tecnicosController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTecnicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const tecnicos = await prisma.tecnico.findMany({
      include: { usuario: true }
    });
    res.json(tecnicos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar técnicos' });
  }
};

export const getTecnicoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const tecnico = await prisma.tecnico.findUnique({
      where: { id: Number.parseInt(id) },
      include: { usuario: true }
    });
    if (tecnico) res.json(tecnico);
    else res.status(404).json({ error: 'Técnico não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar técnico' });
  }
};

export const createTecnico = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId, especialidade, status } = req.body;
  try {
    const newTecnico = await prisma.tecnico.create({
      data: { usuarioId, especialidade, status }
    });
    res.status(201).json(newTecnico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar técnico' });
  }
};

export const updateTecnico = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { especialidade, status } = req.body;
  try {
    const updatedTecnico = await prisma.tecnico.update({
      where: { id: Number.parseInt(id) },
      data: { especialidade, status }
    });
    res.json(updatedTecnico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar técnico' });
  }
};

export const deleteTecnico = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.tecnico.delete({ where: { id: Number.parseInt(id) } });
    res.json({ message: 'Técnico removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover técnico' });
  }
};
