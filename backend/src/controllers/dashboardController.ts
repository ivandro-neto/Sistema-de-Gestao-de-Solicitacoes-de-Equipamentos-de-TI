// src/controllers/atribuicoesController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTotalsRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRequests = await prisma.solicitation.count();
    const totalPendings = await prisma.solicitation.count({where : {status : "pending"}});
    const totalProgress = await prisma.solicitation.count({where : {status : "progress"}});
    const totalCompleted = await prisma.solicitation.count({where : {status : "completed"}});
    res.json({totalRequests, totalPendings , totalProgress, totalCompleted});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};

export const getTotalsRequestsByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const totalRequests = await prisma.solicitation.count({where : {solicitanteId : id}});
    const totalPendings = await prisma.solicitation.count({where : {status : "pending", solicitanteId : id}});
    const totalProgress = await prisma.solicitation.count({where : {status : "progress", solicitanteId : id}});
    const totalCompleted = await prisma.solicitation.count({where : {status : "completed", solicitanteId : id}});
    res.json({totalRequests, totalPendings , totalProgress, totalCompleted});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar solicitacoes' });
  }
};

export const getTotalsAssignedByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const totalAssigned = await prisma.atribuicaoTecnico.count({where : {tecnico : {usuarioId : id}}});
    const totalPendings = await prisma.atribuicaoTecnico.count({where : {tecnico : {usuarioId : id}, solicitacao : {status : "pending" }}});
    const totalProgress = await prisma.atribuicaoTecnico.count({where : {tecnico : {usuarioId : id}, solicitacao : {status : "progress" }}});
    const totalCompleted = await prisma.atribuicaoTecnico.count({where : {tecnico : {usuarioId : id}, solicitacao : {status : "completed" }}});
  
    res.json({totalAssigned, totalPendings , totalProgress, totalCompleted});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar atribuição' });
  }
};



