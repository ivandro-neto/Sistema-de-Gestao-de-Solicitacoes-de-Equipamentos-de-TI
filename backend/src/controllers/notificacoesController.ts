import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getNotificacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notificacoes = await prisma.notificacao.findMany({
      include: { usuario: true }
    });
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notificações.' });
  }
};

export const getNotificacaoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const notificacao = await prisma.notificacao.findUnique({
      where: { id },
      include: { usuario: true }
    });
    if (notificacao) res.json(notificacao);
    else res.status(404).json({ error: 'Notificação não encontrada.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notificação.' });
  }
};

export const createNotificacao = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId, destinatario, mensagem } = req.body;
  try {
    const newNotificacao = await prisma.notificacao.create({
      data: { usuarioId, destinatario, mensagem }
    });
    res.status(201).json(newNotificacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar notificação.' });
  }
};

export const updateNotificacao = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { mensagem, lida, destinatario } = req.body;
  try {
    const updatedNotificacao = await prisma.notificacao.update({
      where: { id },
      data: { mensagem, lida, destinatario }
    });
    res.json(updatedNotificacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar notificação.' });
  }
};

export const deleteNotificacao = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.notificacao.delete({ where: { id } });
    res.json({ message: 'Notificação removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover notificação.' });
  }
};

export const createNotificacoesPorTipo = async (req: Request, res: Response): Promise<void> => {
  const { tipoUsuario, mensagem } = req.body;
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { tipo: tipoUsuario }
    });
    if (!usuarios || usuarios.length === 0) {
      res.status(404).json({ error: 'Nenhum usuário encontrado para esse tipo.' });
      return;
    }
    const notificacoesCriadas = await Promise.all(
      usuarios.map((usuario) =>
        prisma.notificacao.create({
          data: {
            usuarioId: usuario.id,
            destinatario: usuario.email,
            mensagem: mensagem
          }
        })
      )
    );
    res.status(201).json({ message: 'Notificações criadas com sucesso.', notificacoes: notificacoesCriadas });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar notificações por tipo de usuário.' });
  }
};
