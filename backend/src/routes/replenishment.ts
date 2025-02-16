import { Router } from "express";
import { getReplenishmentOrders, updateComponentStock } from "../controllers/replenishmentController";

const router = Router();

router.get("/", getReplenishmentOrders);
router.patch("/:id", updateComponentStock);

export default router;
