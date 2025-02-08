// src/routes/solicitacoes.ts
import { Router } from 'express';
import { getSolicitacoes, getSolicitacaoById, createSolicitacao, updateSolicitacao, deleteSolicitacao, updateSolicitacaoStatus } from '../controllers/solicitacoesController';

const router = Router();

router.get('/', getSolicitacoes);
router.get('/:id', getSolicitacaoById);
router.post('/', createSolicitacao);
router.put('/:id', updateSolicitacao);
router.patch('/:id/status', updateSolicitacaoStatus);
router.delete('/:id', deleteSolicitacao);

export default router;
