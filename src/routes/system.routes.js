import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import { createEmployee } from "../controllers/rh.controller.js";
const router = Router();
// router.get("/test", verifyToken, verifyRole(["admin"]), pruebadepetiociones);
export default router;
