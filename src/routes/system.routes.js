import { Router } from "express";
import { verifyRole, verifyToken } from "../middlewares/auth.middleware.js";
import { changeAntenna, changeComputer, changeScreen, createAntenna, createComputer, createPrinter, createScreen, listAntennaHistory, listAntennas, listComputerConditionalStates, listComputerFunctionalStates, listComputerHistory, listComputers, listPrinters, listScreens } from "../controllers/system.controller.js";
import { validateChangeAntenna, validateChangeComputer, validateChangeScreen, validateCreateAntenna, validateCreateComputer, validateCreatePrinter, validateCreateScreen } from "../middlewares/validator/auth.validator.js";

const router = Router();

router.get("/computer", verifyToken, verifyRole(["System"]), listComputers);
router.get("/computer-history", verifyToken, verifyRole(["System"]), listComputerHistory);
router.get("/computer/functional", verifyToken, verifyRole(["System"]), listComputerFunctionalStates);
router.get("/computer/conditional", verifyToken, verifyRole(["System"]), listComputerConditionalStates);
router.get("/screen", verifyToken, verifyRole(["System"]), listScreens);
router.get("/antennas-history", verifyToken, verifyRole(["System"]), listAntennaHistory);
router.get("/antenna", verifyToken, verifyRole(["System"]), listAntennas);
router.get("/printer", verifyToken, verifyRole(["System"]), listPrinters);
router.post("/computer", verifyToken, verifyRole(["System"]), validateCreateComputer, createComputer);
router.post("/screen", verifyToken, verifyRole(["System"]), validateCreateScreen, createScreen);
router.post("/antenna", verifyToken, verifyRole(["System"]), validateCreateAntenna, createAntenna);
router.post("/printer", verifyToken, verifyRole(["System"]), validateCreatePrinter, createPrinter);
router.put("/computer", verifyToken, verifyRole(["System"]), validateChangeComputer, changeComputer);
router.put("/screen", verifyToken, verifyRole(["System"]), validateChangeScreen, changeScreen);
router.put("/antenna", verifyToken, verifyRole(["System"]), validateChangeAntenna, changeAntenna);

export default router;
