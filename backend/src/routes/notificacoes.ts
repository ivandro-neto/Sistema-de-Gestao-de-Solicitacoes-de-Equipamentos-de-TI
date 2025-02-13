import { Router } from 'express';
import { 
  getNotificacoes, 
  getNotificacaoById, 
  createNotificacao, 
  updateNotificacao, 
  deleteNotificacao,
  createNotificacoesPorTipo
} from '../controllers/notificacoesController';

const router = Router();

router.get('/', getNotificacoes);
router.get('/:id', getNotificacaoById);
router.post('/', createNotificacao);
router.put('/:id', updateNotificacao);
router.delete('/:id', deleteNotificacao);
router.post('/enviar', createNotificacoesPorTipo);

export default router;
