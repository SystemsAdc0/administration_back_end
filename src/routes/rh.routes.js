import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import {
  createEmployee,
  changeEmployee,
  changeEmployeeStatus,
  listEmployees,
  listEmployeesByStatus,
  listEmployeeById,
  softDeleteEmployee,
  createHealthEmployee,
  changeHealthEmployee,
  createAllergie,
  createMedication,
  createDisease,
  createEducationEmployee,
  createLanguageEmployee,
  // createStatusHistory,
  listStatusHistoryByType,
  listStatusHistoryByEmployeeId,
  // createAdjustmentSalaries,
  listAdjustmentSalaries,
  listAdjustmentSalariesByEmployeeId,
  createLodging,
  listLodgings,
  listLodgingsByEmployeeId,
  createDocument,
  listDocumentsByEmployeeId,
  changeDocument,
  createContract,
  listContracts,
  changeContract,
  createEmployeeContract,
  listEmployeeContractByEmployeeId,
  changeEmployeeContract,
  changeEmployeeSalary,
} from "../controllers/rh.controller.js";
import {
  validateCreateEmployee,
  validateChangeEmployee,
  validateChangeEmployeeStatus,
  validateSoftDeleteEmployee,
  validateChangeHealthEmployee,
  validateCreateMedicOption,
  validateCreateEducationLanguage,
  validateCreateStatusHistory,
  validateAdjusmentSalarie,
  validateEmployeeId,
  validateCreateLodging,
  validateCreateDocument,
  validateChangeDocument,
  validateCreateContract,
  validateChangeContract,
  validateCreateEmployeeContract,
  validateChangeEmployeeContract,
  validateChangeEmployeeSalary,
} from "../middlewares/validator/auth.validator.js";

const router = Router();

router.get("/", verifyToken, verifyRole(["RH"]), listEmployees);
router.get(
  "/list-status/",
  verifyToken,
  verifyRole(["RH"]),
  listEmployeesByStatus
);
router.get("/employee/:id", verifyToken, verifyRole(["RH"]), validateEmployeeId, listEmployeeById);
router.get(
  "/status-history",
  verifyToken,
  verifyRole(["RH"]),
  listStatusHistoryByType
);
router.get(
  "/status-history/employee",
  verifyToken,
  verifyRole(["RH"]),
  listStatusHistoryByEmployeeId
);
router.get(
  "/adjusment",
  verifyToken,
  verifyRole(["RH"]),
  listAdjustmentSalaries
);
router.get(
  "/adjusment-employee/:id",
  verifyToken,
  verifyRole(["RH"]),
  validateEmployeeId,
  listAdjustmentSalariesByEmployeeId
);
router.get("/lodging", verifyToken, verifyRole(["RH"]), listLodgings);
router.get(
  "/lodging-employee",
  verifyToken,
  verifyRole(["RH"]),
  listLodgingsByEmployeeId
);
router.get(
  "/document-employee/:id",
  verifyToken,
  verifyRole(["RH"]),
  validateEmployeeId,
  listDocumentsByEmployeeId
);
router.get("/contract", verifyToken, verifyRole(["RH"]), listContracts);
router.get(
  "/employee-contract/:id",
  verifyToken,
  verifyRole(["RH"]),
  validateEmployeeId,
  listEmployeeContractByEmployeeId
);
router.post(
  "/",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateEmployee,
  createEmployee
);
router.post("/healths", verifyToken, verifyRole(["RH"]), createHealthEmployee);
router.post(
  "/medic-option/allergie",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateMedicOption,
  createAllergie
);
router.post(
  "/medic-option/medication",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateMedicOption,
  createMedication
);
router.post(
  "/medic-option/disease",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateMedicOption,
  createDisease
);
router.post(
  "/education",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateEducationLanguage,
  createEducationEmployee
);
router.post(
  "/language",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateEducationLanguage,
  createLanguageEmployee
);
// router.post(
//   "/status",
//   verifyToken,
//   verifyRole(["RH"]),
//   validateCreateStatusHistory,
//   createStatusHistory
// );
// router.post(
//   "/adjustment",
//   verifyToken,
//   verifyRole(["RH"]),
//   validateAdjusmentSalarie,
//   createAdjustmentSalaries
// );
router.post(
  "/lodging",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateLodging,
  createLodging
);
router.post(
  "/document",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateDocument,
  createDocument
);
router.post(
  "/contract",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateContract,
  createContract
);
router.post(
  "/employee-contract",
  verifyToken,
  verifyRole(["RH"]),
  validateCreateEmployeeContract,
  createEmployeeContract
);
router.put(
  "/",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeEmployee,
  changeEmployee
);
router.put(
  "/employee-status",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeEmployeeStatus,
  changeEmployeeStatus
);
router.put("/employee-salary", verifyToken, verifyRole(["RH"]), validateChangeEmployeeSalary, changeEmployeeSalary)
router.put(
  "/healths",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeHealthEmployee,
  changeHealthEmployee
);
router.put(
  "/document",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeDocument,
  changeDocument
);
router.put(
  "/contract",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeContract,
  changeContract
);
router.put(
  "/employee-contract",
  verifyToken,
  verifyRole(["RH"]),
  validateChangeEmployeeContract,
  changeEmployeeContract
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["RH"]),
  validateSoftDeleteEmployee,
  softDeleteEmployee
);

export default router;
