// src/routes/componentes.ts
import { Router } from 'express';
import { getComponentes, getComponenteById, createComponente, updateComponente, deleteComponente } from '../controllers/componentesController';

const router = Router();

router.get('/', getComponentes);
router.get('/:id', getComponenteById);
router.post('/', createComponente);
router.put('/:id', updateComponente);
router.delete('/:id', deleteComponente);

export default router;
