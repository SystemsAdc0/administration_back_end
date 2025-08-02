import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import { createEmployee } from "../controllers/rh.controller.js";
import { validateCreateEmployee } from "../middlewares/validator/auth.validator.js";

const router = Router();
router.post("/prueba", verifyToken, verifyRole(["RH"]), validateCreateEmployee, createEmployee);
export default router;
