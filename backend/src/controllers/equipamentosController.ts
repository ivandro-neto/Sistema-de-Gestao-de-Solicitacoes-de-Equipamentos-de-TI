// src/controllers/equipamentosController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getEquipamentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const equipamentos = await prisma.equipamento.findMany({
      include: { componentes: true }
    });
    res.json(equipamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
};

export const getEquipamentoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const equipamento = await prisma.equipamento.findUnique({
      where: { id: Number.parseInt(id) },
      include: { componentes: true }
    });
    if (equipamento) res.json(equipamento);
    else res.status(404).json({ error: 'Equipamento não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar equipamento' });
  }
};

export const createEquipamento = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao } = req.body;
  try {
    const newEquipamento = await prisma.equipamento.create({
      data: { nome, descricao }
    });
    res.status(201).json(newEquipamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar equipamento' });
  }
};

export const updateEquipamento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    const updatedEquipamento = await prisma.equipamento.update({
      where: { id: Number.parseInt(id) },
      data: { nome, descricao }
    });
    res.json(updatedEquipamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar equipamento' });
  }
};

export const deleteEquipamento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    
    const equipamento = await prisma.equipamento.findUnique({ where: { id: Number.parseInt(id) } });
    if(!equipamento)
      //@ts-ignore
      return res.status(404).json({error : "Este equipamento não existe."})
    
      await prisma.equipamento.delete({where : { id : Number.parseInt(id)}})
      //@ts-ignore
    return res.json({ message: 'Equipamento removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover equipamento' });
  }
};
