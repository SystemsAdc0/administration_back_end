import { check, body } from "express-validator";
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

export const validateCreateEmployee = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("start_date")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatorio")
    .isDate()
    .withMessage("El valor debe de ser una fech valida"),
  body("position")
    .notEmpty()
    .withMessage("La posisión es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("department")
    .notEmpty()
    .withMessage("El departamento es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("ubication")
    .notEmpty()
    .withMessage("La ubicación es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("personal_phone")
    .notEmpty()
    .withMessage("El telefono personal es obligatorio")
    .isInt()
    .withMessage("El valor debe de ser numerico"),
  body("personal_email")
    .notEmpty()
    .withMessage("El correo personal es obligatorio")
    .isEmail()
    .withMessage("El valor debe de ser un correo valido"),
  body("nss")
    .notEmpty()
    .withMessage("El NSS es obligatorio")
    .isInt()
    .withMessage("El valor debe de ser numerico")
    .isLength({ max: 11 })
    .withMessage("El NSS debe de ser un valor maximo de 11 digitos"),
  body("curp")
    .notEmpty()
    .withMessage("La CURP es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto")
    .isLength({ max: 17 })
    .withMessage("La CURP debe de ser un valor maximo de 17 digitos"),
  body("rfc")
    .notEmpty()
    .withMessage("El RFC es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto")
    .isLength({ max: 14 })
    .withMessage("El RFC debe de ser un valor maximo de 14 digitos"),
  body("address")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("daily_salary")
    .notEmpty()
    .withMessage("El salario diario es obligatorio")
    .isDecimal()
    .withMessage("El valor debe de ser numerico con puntos decimales"),
  body("net_salary")
    .notEmpty()
    .withMessage("El salario neto es obligatorio")
    .isDecimal()
    .withMessage("El valor debe de ser numerico con puntos decimales"),
  body("bank")
    .notEmpty()
    .withMessage("El banco es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("code_bank")
    .notEmpty()
    .withMessage("La CLABE Interbancaria es obligatoria")
    .isInt()
    .withMessage("El valor debe de ser numerico")
    .isLength({ max: 18 })
    .withMessage("El valor debe de ser un valor maximo de 18 digitos"),
  body("shift")
    .notEmpty()
    .withMessage("El turno es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),

  validateFields,
];
