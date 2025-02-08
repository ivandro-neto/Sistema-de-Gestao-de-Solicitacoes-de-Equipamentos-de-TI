// src/routes/tecnicos.ts
import { Router } from 'express';
import { getTecnicos, getTecnicoById, createTecnico, updateTecnico, deleteTecnico } from '../controllers/tecnicosController';

const router = Router();

router.get('/', getTecnicos);
router.get('/:id', getTecnicoById);
router.post('/', createTecnico);
router.put('/:id', updateTecnico);
router.delete('/:id', deleteTecnico);

export default router;
