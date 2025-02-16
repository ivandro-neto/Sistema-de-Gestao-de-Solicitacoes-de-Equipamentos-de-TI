// src/routes/usuarios.ts
import { Router } from 'express';
import { getUsuarios, createUsuario, getUsuarioById, updateUsuario, deleteUsuario, login, getUsuarioByTechId, getUsuarioByEmail, updatePasswordUsuario } from '../controllers/usuariosController';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', getUsuarioByEmail);
router.post('/login', login);
router.post('/register', createUsuario);
router.put('/:id', updateUsuario);
router.patch('/:id/soft-update', updatePasswordUsuario);
router.delete('/:id', deleteUsuario);

export default router;
