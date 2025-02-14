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

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;
  
  try {
    const userExist = await prisma.usuario.findUnique({ where: { email } });

    if (!userExist) {
      //@ts-ignore
      return res.status(404).json({ error: { status: 404, message: "User not found" } });
    }

    if (userExist.senha !== senha) {
      //@ts-ignore
      return res.status(400).json({ error: { status: 400, message: "Wrong password, try again!" } });
    }
    //@ts-ignore
    return res.status(200).json({
      id: userExist.id,
      name: userExist.nome,
      email: userExist.email,
      depart: userExist.departamento,
      type: userExist.tipo,
    });

  } catch (err) {
    console.error("Login error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: { status: 500, message: "Error logging in with this user, try again later!" } });
    }
  }
};


export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id} });
    if (!usuario)
      res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

export const createUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha, tipo, departamento } = req.body;
  try {
    const existedUser = await prisma.usuario.findUnique({where : {email}})
    if(existedUser)
      //@ts-ignore
     return res.status(400).json({ error : 'Já existe um usuário com este email.'})
    const newUsuario = await prisma.usuario.create({
      data: { nome, email, senha, tipo, departamento }
    });
    let tecnico = null
    if(newUsuario.tipo === 3241)
      tecnico = await prisma.tecnico.create({data : {usuarioId : newUsuario.email, especialidade : 'Hardware', status : "available"}});
    //@ts-ignore
   return res.status(201).json(newUsuario, tecnico);
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ error: 'Erro ao criar usuário'+ error });
  }
};

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, email, senha, tipo, departamento } = req.body;
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id},
      data: { nome, email, senha, tipo, departamento }
    });
    //@ts-ignore
    return res.json(updatedUsuario);
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id} });
    //@ts-ignore
    return res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ error: 'Erro ao remover usuário' });
  }
};
