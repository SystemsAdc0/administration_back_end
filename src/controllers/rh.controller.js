import { RH } from "../models/rh.model.js";

export const createEmployee = async (req, res) => {
  try {
    const register = await RH.insertEmployee(req.body, req.user.name);
    return res.status(200).json(register);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode });
  }
};

export const changeEmployee = async (req, res) => {
  try {
    const update = await RH.updateEmployee(req.body, req.user.name);
    return res.status(200).json(update);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode})
  }
}

export const changeEmployeeStatus = async (req, res) => {
  try {
    const update = await RH.updateEmployeeStatus(req.body, req.user.name);
    return res.status(200).json(update);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode})
  }
}

export const changeEmployeeSalary = async (req, res) => {
  try {
    const salary = await RH.updateEmployeeSalary(req.body, req.user.name);
    return res.status(200).json(salary);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listEmployees = async (req, res) => {
  try {
    const list = await RH.getEmployees(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode})
  }
}

export const listEmployeesByStatus = async (req, res) => {
  try {
    const list = await RH.getEmployeesByStatus(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode})
  }
}

export const listEmployeeById = async (req, res) => {
  try {
    const employee = await RH.getEmployeeById(req.params.id);
    return res.status(200).json(employee);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const softDeleteEmployee = async (req, res) => {
  try {
    const softDelete = await RH.deleteEmployee(req.params.id, req.user.name);
    return res.status(200).json(softDelete);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createHealthEmployee = async (req, res) => {
  try {
    const health = await RH.insertHealthEmployee(req.body);
    return res.status(200).json(health);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeHealthEmployee = async (req, res) => {
  try {
    const health = await RH.updateHealthEmployee(req.body);
    return res.status(200).json(health);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createAllergie = async (req, res) => {
  try {
    const resp = await RH.insertAllergie(req.body);
    return res.status(200).json(resp);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createMedication = async (req, res) => {
  try {
    const resp = await RH.insertMedication(req.body);
    return res.status(200).json(resp);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createDisease = async (req, res) => {
  try {
    const resp = await RH.insertDisease(req.body);
    return res.status(200).json(resp);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createEducationEmployee = async (req, res) => {
  try {
    const option = await RH.insertEducation(req.body);
    return res.status(200).json(option);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createLanguageEmployee = async (req, res) => {
  try {
    const option = await RH.insertLanguange(req.body);
    return res.status(200).json(option);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

// export const createStatusHistory = async (req, res) => {
//   try {
//     const status = await RH.insertStatusHistoryEmployee(req.body, req.user.name);
//     return res.status(200).json(status);
//   } catch ({ message, statusCode = 500 }) {
//     res.status(statusCode).json({ msg: message, code: statusCode })
//   }
// }

export const listStatusHistoryByType = async (req, res) => {
  try {
    const list = await RH.getStatusHistoryByType(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listStatusHistoryByEmployeeId = async (req, res) => {
  try {
    const list = await RH.getStatusHistoryByEmployeeId(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

// export const createAdjustmentSalaries = async (req, res) => {
//   try {
//     const adjustment = await RH.insertAdjustmentSalarie(req.body);
//     return res.status(200).json(adjustment);
//   } catch ({ message, statusCode = 500 }) {
//     res.status(statusCode).json({ msg: message, code: statusCode })
//   }
// }

export const listAdjustmentSalaries = async (req, res) => {
  try {
    const listAdjustment = await RH.getAdjusmentSalaries(req.query);
    return res.status(200).json(listAdjustment);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listAdjustmentSalariesByEmployeeId = async (req, res) => {
  try {
    const listAdjustment = await RH.getAdjusmentSalariesByEmployeeId(req.params.id);
    return res.status(200).json(listAdjustment);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createLodging = async (req, res) => {
  try {
    const lodging = await RH.insertLodging(req.body, req.user.name);
    return res.status(200).json(lodging);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listLodgings = async (req, res) => {
  try {
    const list = await RH.getLodgings(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listLodgingsByEmployeeId = async (req, res) => {
  try {
    const list = await RH.getLodgingsByEmployeeId(req.query);
    return res.status(200).json(list);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createDocument = async (req, res) => {
  try {
    const document = await RH.insertDocument(req.body, req.user.name);
    return res.status(200).json(document);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listDocumentsByEmployeeId = async (req, res) => {
  try {
    const documents = await RH.getDocumentsByEmployeeId(req.params.id);
    return res.status(200).json(documents);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeDocument = async (req, res) => {
  try {
    const document = await RH.updateDocument(req.body);
    return res.status(200).json(document);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createContract = async (req, res) => {
  try {
    const contract = await RH.insertContract(req.body.name);
    return res.status(200).json(contract);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listContracts = async (req, res) => {
  try {
    const contracts = await RH.getContracts();
    return res.status(200).json(contracts);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeContract = async (req, res) => {
  try {
    const contract = await RH.updateContract(req.body);
    return res.status(200).json(contract);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createEmployeeContract = async (req, res) => {
  try {
    const emp_contract = await RH.insertEmployeeContract(req.body, req.user.name);
    return res.status(200).json(emp_contract);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listEmployeeContractByEmployeeId = async (req, res) => {
  try {
    const emp_contract = await RH.getEmployeeContractsByEmployeeId(req.params.id);
    return res.status(200).json(emp_contract);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeEmployeeContract = async (req, res) => {
  try {
    const emp_contract = await RH.updateEmployeeContract(req.body, req.user.name);
    return res.status(200).json(emp_contract);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}