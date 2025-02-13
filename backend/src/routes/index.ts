import { Router } from 'express';
import usuariosRouter from './usuarios';
import solicitacoesRouter from './solicitacoes';
import equipamentosRouter from './equipamentos';
import componentesRouter from './componentes';
import tecnicosRouter from './tecnicos';
import atribuicoesRouter from './atribuicoes';
import historicoRouter from './historico';
import relatoriosRouter from './relatorios';
import dashboardRouter from './dashboard';
import notificacaoRouter from './notificacoes';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use('/solicitacoes', solicitacoesRouter);
router.use('/equipamentos', equipamentosRouter);
router.use('/componentes', componentesRouter);
router.use('/tecnicos', tecnicosRouter);
router.use('/atribuicoes', atribuicoesRouter);
router.use('/historico', historicoRouter);
router.use('/relatorios', relatoriosRouter);
router.use('/dashboard', dashboardRouter);
router.use('/notificacoes', notificacaoRouter);

export default router;
