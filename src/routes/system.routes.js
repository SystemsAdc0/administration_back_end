import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/computer", verifyToken, verifyRole(["admin"]), pruebadepetiociones);
export default router;
