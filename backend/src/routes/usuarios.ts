// src/routes/usuarios.ts
import { Router } from 'express';
import { getUsuarios, createUsuario, getUsuarioById, updateUsuario, deleteUsuario, login } from '../controllers/usuariosController';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/login', login);
router.post('/register', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
