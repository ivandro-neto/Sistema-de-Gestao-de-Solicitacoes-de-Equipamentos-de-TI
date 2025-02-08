// src/controllers/usuariosController.ts
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number.parseInt(id) } });
    if (usuario) res.json(usuario);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

export const createUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senhaHash, tipo, departamento } = req.body;
  try {
    const existedUser = await prisma.usuario.findUnique({where : {email}})
    if(existedUser)
      res.status(400).json({ error : 'Já existe um usuário com este email.'})
    const newUsuario = await prisma.usuario.create({
      data: { nome, email, senhaHash, tipo, departamento }
    });
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, email, senhaHash, tipo, departamento } = req.body;
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: Number.parseInt(id) },
      data: { nome, email, senhaHash, tipo, departamento }
    });
    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id: Number.parseInt(id) } });
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
};
