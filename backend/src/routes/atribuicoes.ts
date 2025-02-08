// src/routes/atribuicoes.ts
import { Router } from 'express';
import { getAtribuicoes, getAtribuicaoById, createAtribuicao, deleteAtribuicao } from '../controllers/atribuicoesController';

const router = Router();

router.get('/', getAtribuicoes);
router.get('/:id', getAtribuicaoById);
router.post('/', createAtribuicao);
router.delete('/:id', deleteAtribuicao);

export default router;
