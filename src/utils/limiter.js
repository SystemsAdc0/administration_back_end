import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV == "local" ? 100 : 10,
  message: "Demasiados intentos de login",
});

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes, intenta más tarde",
  standardHeaders: true,
  legacyHeaders: false,
});
