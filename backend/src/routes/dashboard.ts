// src/routes/dashboard.ts
import { Router } from 'express';
import { getTotalsAssignedByUserId, getTotalsRequests, getTotalsRequestsByUserId} from '../controllers/dashboardController';

const router = Router();

router.get('/', getTotalsRequests);
router.get('/users/:id/requests', getTotalsRequestsByUserId);
router.get('/users/:id/assigns', getTotalsAssignedByUserId);


export default router;
