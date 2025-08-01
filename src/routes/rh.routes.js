import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import { pruebadepetiociones } from "../controllers/rh.controller.js";

const router = Router();
router.post("/prueba", verifyToken, verifyRole(["RH"]), pruebadepetiociones);
export default router;
