// src/routes/historico.ts
import { Router } from 'express';
import { getHistorico, getHistoricoById, createHistorico, deleteHistorico } from '../controllers/historicoController';

const router = Router();

router.get('/', getHistorico);
router.get('/:id', getHistoricoById);
router.post('/', createHistorico);
router.delete('/:id', deleteHistorico);

export default router;
