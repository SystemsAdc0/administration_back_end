import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { validatorLogin } from "../middlewares/validator/auth.validator.js";
import { loginLimiter } from "../utils/limiter.js";

const router = Router();
router.post("/login", loginLimiter, validatorLogin, login);
export default router;
