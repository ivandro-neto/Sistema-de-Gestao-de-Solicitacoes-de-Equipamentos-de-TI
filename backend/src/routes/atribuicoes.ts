// src/routes/atribuicoes.ts
import { Router } from 'express';
import { getAtribuicoes, getAtribuicaoById, createAtribuicao, deleteAtribuicao, getAtribuicaoByUserId } from '../controllers/atribuicoesController';

const router = Router();

router.get('/', getAtribuicoes);
router.get('/:id', getAtribuicaoById);
router.get('/users/:id', getAtribuicaoByUserId);
router.post('/', createAtribuicao);
router.delete('/:id', deleteAtribuicao);

export default router;
