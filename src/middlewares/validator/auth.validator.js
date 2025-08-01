import { check } from "express-validator";
import { validateFields } from "./validate.middleware.js";

export const validatorLogin = [
  check("email")
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("El formato del correo no es válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La contraseña debe tener al menos 3 caracteres"),

  validateFields,
];
