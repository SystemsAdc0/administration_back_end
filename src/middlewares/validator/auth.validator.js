import { check, body, param, query } from "express-validator";
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
  body("employee_id")
    .notEmpty()
    .withMessage("El id del emplado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser in valor entero"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("start_date")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatorio")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("El valor debe de ser una fecha valida"),
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
    .isIn(["Día", "Noche"])
    .withMessage("El turno debe de ser Día o Noche"),
  body("work_email")
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("El correo laboral debe de ser un correo valido"),
  body("birth_place")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El lugar de nacimiento debe de ser texto"),
  body("birth_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha de nacimiento debe de ser una fecha valida"),
  body("nationality")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La nacionalidad debe de ser texto"),
  body("can_travel")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("La opción si puede viajar debe de ser booleano"),
  body("car_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del carro debe de ser un valor entero"),
  body("marital_status")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El estatus marital debe de ser texto"),
  body("infonavit_type")
    .optional({ values: "falsy" })
    .isIn([
      "No cuenta con crédito",
      "Crédito Tradicional",
      "MejOraSí",
      "ConstruYO",
      "Pago de Pasivos",
      "Unamos Créditos",
      "Crédito Conyugal",
      "Segundo Crédito Infonavit",
    ])
    .withMessage("El tipo de infonavit debe de ser uno valido"),
  body("infonavit_number")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El numero de infonavit debe de ser numerico"),
  body("work_site_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del sitio de trabajo debe de ser un numero entero"),
  body("return_home")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("El regreso a casa debe de ser un valor booleano"),
  body("degree")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El titulo debe de ser un texto"),
  body("work_phone")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El telefono laboral debe de ser un valor numerico"),
  validateFields,
];

export const validateChangeEmployee = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del emplado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser in valor entero"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El valor debe de ser texto"),
  body("start_date")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatorio")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("El valor debe de ser una fecha valida"),
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
    .isIn(["Día", "Noche"])
    .withMessage("El valor turno debe de ser un turno de Día o Noche"),
  body("work_email")
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("El correo laboral debe de ser un correo valido"),
  body("birth_place")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El lugar de nacimiento debe de ser texto"),
  body("birth_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha de nacimiento debe de ser una fecha valida"),
  body("nationality")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La nacionalidad debe de ser texto"),
  body("can_travel")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("La opción si puede viajar debe de ser booleano"),
  body("car_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del carro debe de ser un valor entero"),
  body("marital_status")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El estatus marital debe de ser texto"),
  body("infonavit_type")
    .optional({ values: "falsy" })
    .isIn([
      "No cuenta con crédito",
      "Crédito Tradicional",
      "MejOraSí",
      "ConstruYO",
      "Pago de Pasivos",
      "Unamos Créditos",
      "Crédito Conyugal",
      "Segundo Crédito Infonavit",
    ])
    .withMessage("El tipo de infonavit debe de ser uno valido"),
  body("infonavit_number")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El numero de infonavit debe de ser numerico"),
  body("work_site_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del sitio de trabajo debe de ser un numero entero"),
  body("return_home")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("El regreso a casa debe de ser un valor booleano"),
  body("degree")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El titulo debe de ser un texto"),
  body("work_phone")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El telefono laboral debe de ser un valor numerico"),
  validateFields,
];

export const validateChangeEmployeeStatus = [
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "Incidente", "Vacaciones"])
    .withMessage("El status debe de ser un status valido"),
  body("employee_id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isInt()
    .withMessage("El id debe de ser un numero entero"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("start_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha de inicio debe de ser una fecha valida"),
  body("end_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha final debe de ser una fecha valida"),

  validateFields,
];

export const validateChangeEmployeeSalary = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("new_salary")
    .notEmpty()
    .withMessage("El nuevo salario es obligatorio")
    .isDecimal()
    .withMessage(
      "El nuevo salario debe de ser un valor numerico con decimales"
    ),

  validateFields,
];

export const validateSoftDeleteEmployee = [
  param("id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  validateFields,
];

export const validateChangeHealthEmployee = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del emplado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("current_health")
    .notEmpty()
    .withMessage("El estado de salud del empleado es obligatorio")
    .isIn(["Bueno", "Malo", "Regular"])
    .withMessage("El estado de salud del empleado debe de ser uno valido"),
  body("blood_type")
    .optional({ values: "falsy" })
    .isIn(["Desconoce", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("El tipo de sangre del empleado debe de ser texto"),
  body("emergency_contact_name")
    .notEmpty()
    .withMessage("El nombre de contacto de emergencia es obligatoroi")
    .isString()
    .withMessage("El nombre de contacto de emergencia debe de ser texto"),
  body("emergency_contact_phone")
    .notEmpty()
    .withMessage("El contacto de emergencia es obligatorio")
    .isInt()
    .withMessage("El contacto de emergencia debe de ser numerico"),
  body("relationship")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El parentesco debe de ser texto"),

  validateFields,
];

export const validateCreateMedicOption = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empoleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe de ser texto"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),

  validateFields,
];

export const validateCreateEducationLanguage = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empoleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe de ser texto"),
  body("level")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),

  validateFields,
];

export const validateCreateStatusHistory = [
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("type")
    .notEmpty()
    .withMessage("El tipo de estatus es obligatorio")
    .isIn(["Activo", "Baja", "Incidente", "Vacaciones"])
    .withMessage("El status debe de ser un status valido"),
  body("start_date")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha de inicio debe de ser una fecha valida"),
  body("end_date")
    .notEmpty()
    .withMessage("La fecha final es obligatoria")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha final debe de ser una fecha valida"),
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateAdjusmentSalarie = [
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("new_salary")
    .notEmpty()
    .withMessage("El salario nuevo es obligatorio")
    .isDecimal()
    .withMessage("El salario nuevo debe de ser un valor con decimales"),
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateEmployeeId = [
  param("id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateCreateLodging = [
  body("lodging_name")
    .notEmpty()
    .withMessage("El nombre del hospedaje es obligatorio")
    .isString()
    .withMessage("El nombre del hospedaje debe de ser texto"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("travel_support")
    .optional({ values: "falsy" })
    .isDecimal()
    .withMessage("Los viaticos debe de ser un valor numerico con decimales"),
  body("state")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isString()
    .withMessage("El estado debe de ser texto"),
  body("location")
    .notEmpty()
    .withMessage("La locación es obligatoria")
    .isString()
    .withMessage("La locación debe de ser texto"),
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateCreateDocument = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("file_name")
    .notEmpty()
    .withMessage("El nombre del archivo es obligatorio")
    .isString()
    .withMessage("El nombre del archivo debe de ser texto"),
  body("type")
    .notEmpty()
    .withMessage("El tipo es obligatorio")
    .isIn([
      "Contrato",
      "ID",
      "RFC",
      "CURP",
      "Bank",
      "Carta Responsiva",
      "Educación",
    ])
    .withMessage("El tipo de documento debe de ser valido"),

  validateFields,
];

export const validateChangeDocument = [
  body("id")
    .notEmpty()
    .withMessage("El id del documento es obligatorio")
    .isInt()
    .withMessage("El id del documento debe de ser un valor numerico entero"),
  body("file_name")
    .notEmpty()
    .withMessage("El nombre del archivo es obligatorio")
    .isString()
    .withMessage("El nombre del documento "),
  body("type")
    .notEmpty()
    .withMessage("El tipo es obligatorio")
    .isIn([
      "Contrato",
      "ID",
      "RFC",
      "CURP",
      "Bank",
      "Carta Responsiva",
      "Educación",
    ])
    .withMessage("El tipo de documento debe de ser valido"),

  validateFields,
];

export const validateCreateContract = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del contrato es obligatorio")
    .isString()
    .withMessage("El nombre del contrato debe de ser texto"),

  validateFields,
];

export const validateChangeContract = [
  body("id")
    .notEmpty()
    .withMessage("El id del contrato es obligatorio")
    .isInt()
    .withMessage("El id del contrato debe de ser un valor numerico entero"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del contrato es obligatorio")
    .isString()
    .withMessage("El nombre del contrato debe de ser texto"),

  validateFields,
];

export const validateCreateEmployeeContract = [
  body("employee_id")
    .notEmpty()
    .withMessage("El id del empleado es obligatorio")
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("contract_name")
    .notEmpty()
    .withMessage("El nombre del contrato es obligatorio")
    .isString()
    .withMessage("El nombre del contrato debe de ser un valor numerico entero"),
  body("end_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha final debe de ser una fecha valida"),

  validateFields,
];

export const validateChangeEmployeeContract = [
  body("id")
    .notEmpty()
    .withMessage("El id del contrato del empleado es obligatorio")
    .isInt()
    .withMessage(
      "El id del contrato del empleado debe de ser un valor numerico entero"
    ),
  body("contract_name")
    .notEmpty()
    .withMessage("El nombre del contrato es obligatorio")
    .isString()
    .withMessage("El nombre del contrato debe de ser un valor numerico entero"),
  body("end_date")
    .optional({ values: "falsy" })
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-", "/"] })
    .withMessage("La fecha final debe de ser una fecha valida"),

  validateFields,
];

/* -------------- VALIDACIONES PARA EL ROL DE SISTEMAS ---------------*/

export const validateCreateComputer = [
  body("brand")
    .notEmpty()
    .withMessage("La marca es obligatoria")
    .isString()
    .withMessage("La marca debe de ser texto"),
  body("model")
    .notEmpty()
    .withMessage("El modelo es obligatorio")
    .isString()
    .withMessage("El modelo debe de ser texto"),
  body("type_id")
    .notEmpty()
    .withMessage("El tipo de ID es obligatorio")
    .isIn(["Numero Serial", "Windows ID"])
    .withMessage("El tipo de ID tiene que ser uno valido"),
  body("value_id")
    .notEmpty()
    .withMessage("El valor del id es obligatorio")
    .isString()
    .withMessage("El valor del ID debe de ser texto"),
  body("type")
    .notEmpty()
    .withMessage("El tipo de computadora es obligatorio")
    .isIn(["Escritorio", "Laptop"])
    .withMessage("El tipo de computadora debe de ser uno valido"),
  body("computer_functional_state_id")
    .notEmpty()
    .withMessage("El estado funcional es obligatorio")
    .isInt()
    .withMessage("El estado funcional debe de ser un valor numerico entero"),
  body("computer_conditional_state_id")
    .notEmpty()
    .withMessage("El estado condicional es obligatorio")
    .isInt()
    .withMessage("El estado condicional debe de ser un valor numerico entero"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico"),

  validateFields,
];

export const validateChangeComputer = [
  body("computer_id")
    .notEmpty()
    .withMessage("El id de la computadora es obligatorio")
    .isInt()
    .withMessage("El id de la computadora debe de ser un valor numerico entero"),
  body("computer_functional_state_id")
    .notEmpty()
    .withMessage("El estado funcional es obligatorio")
    .isInt()
    .withMessage("El estado funcional debe de ser un valor numerico entero"),
  body("computer_conditional_state_id")
    .notEmpty()
    .withMessage("El estado condicional es obligatorio")
    .isInt()
    .withMessage("El estado condicional debe de ser un valor numerico entero"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),

  validateFields,
];

export const validateCreateScreen = [
  body("brand")
    .notEmpty()
    .withMessage("La marca es obligatoria")
    .isString()
    .withMessage("La marca debe de ser texto"),
  body("model")
    .notEmpty()
    .withMessage("El modelo es obligatorio")
    .isString()
    .withMessage("El modelo debe de ser texto"),
  body("serial_number")
    .notEmpty()
    .withMessage("El numero serial es obligatotio")
    .isString()
    .withMessage("El numero serial debe de ser texto"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status debe de ser uno valido"),
  body("computer_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id de la computadora debe der un valor numerico entero"),

  validateFields,
];

export const validateChangeScreen = [
  body("screen_id")
    .notEmpty()
    .withMessage("El id del monitor es obligatorio")
    .isInt()
    .withMessage("El id del monitor debe de ser un valor numerico entero"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status debe de ser uno valido"),
  body("computer_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id de la computadora debe der un valor numerico entero"),

  validateFields,
];

export const validateCreateAntenna = [
  body("kit_number")
    .notEmpty()
    .withMessage("El numero de kit es obligatorio")
    .isString()
    .withMessage("El numero de kit debe de ser texto"),
  body("starlink_id")
    .notEmpty()
    .withMessage("El id de star link es obligatorio")
    .isString()
    .withMessage("El id de star link debe de ser texto"),
  body("router_id")
    .notEmpty()
    .withMessage("El id del router es obligatorio")
    .isString()
    .withMessage("El id del router debe de ser texto"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status debe de ser uno valido"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateChangeAntenna = [
  body("antenna_id")
    .notEmpty()
    .withMessage("El id de la antena es obligatorio")
    .isInt()
    .withMessage("El id de la antena debe de se un valor numerico entero"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status debe de ser uno valido"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
];

export const validateCreatePrinter = [
  body("brand")
    .notEmpty()
    .withMessage("La marca es obligatoria")
    .isString()
    .withMessage("La marca debe de ser texto"),
  body("model")
    .notEmpty()
    .withMessage("El modelo es obligatorio")
    .isString()
    .withMessage("El modelo debe de ser texto"),
  body("serial_number")
    .notEmpty()
    .withMessage("El numero serial es obligatorio")
    .isString()
    .withMessage("El numero serial debe de ser texto"),
  body("status")
    .optional({ values: "falsy" })
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status tiene que ser uno valido"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateChangePrinter = [
  body("printer_id")
    .notEmpty()
    .withMessage("El id de la impresora es obligatorio")
    .isInt()
    .withMessage("El id de la impresora debe de ser un valor numerico entero"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status tiene que ser uno valido"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),

  validateFields,
];

export const validateCreatePhone = [
  body("brand")
    .notEmpty()
    .withMessage("La marca es obligatoria")
    .isString()
    .withMessage("La marca debe de ser texto"),
  body("model")
    .notEmpty()
    .withMessage("El modelo es obligatorio")
    .isString()
    .withMessage("El modelo debe de ser texto"),
  body("imei")
    .notEmpty()
    .withMessage("El imei es obligatorio")
    .isInt()
    .withMessage("El imei tiene que ser un valo numerico entero"),
  body("phone_number")
    .notEmpty()
    .withMessage("El numero del telefono es obligatorio")
    .isInt()
    .withMessage("El numero de telefono debe de ser un valor numerico entero"),
  body("status")
    .notEmpty()
    .withMessage("El statu es oblogatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status debe de ser uno valido"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),

  validateFields,
];

export const validateChangePhone = [
  body("phone_id")
    .notEmpty()
    .withMessage("El id del telefono es obligatorio")
    .isInt()
    .withMessage("El id del telefono debe de ser un valor numerico entero"),
  body("employee_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("El id del empleado debe de ser un valor numerico entero"),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("La descripción debe de ser texto"),
  body("phone_number")
    .notEmpty()
    .withMessage("El numero del telefono es obligatorio")
    .isInt()
    .withMessage("El numero de telefono debe de ser un valor numerico entero"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["Activo", "Baja", "En espera"])
    .withMessage("El status tiene que ser uno valido"),

  validateFields,
];
