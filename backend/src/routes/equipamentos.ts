// src/routes/equipamentos.ts
import { Router } from 'express';
import { getEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, deleteEquipamento } from '../controllers/equipamentosController';

const router = Router();

router.get('/', getEquipamentos);
router.get('/:id', getEquipamentoById);
router.post('/', createEquipamento);
router.put('/:id', updateEquipamento);
router.delete('/:id', deleteEquipamento);

export default router;
