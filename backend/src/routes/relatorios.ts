// src/routes/relatorios.ts
import { Router } from 'express';
import { getRelatorios, getRelatorioById, createRelatorio, deleteRelatorio } from '../controllers/relatoriosController';

const router = Router();

router.get('/', getRelatorios);
router.get('/:id', getRelatorioById);
router.post('/', createRelatorio);
router.delete('/:id', deleteRelatorio);

export default router;
