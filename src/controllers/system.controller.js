import { System } from "../models/system.model.js";

export const createComputer = async (req, res) => {
  try {
    const computer = await System.insertComputer(req.body, req.user.name);
    return res.status(200).json(computer);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode})
  }
};

export const listComputers = async (req, res) => {
  try {
    const computers = await System.getComputers(req.query);
    return res.status(200).json(computers);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeComputer = async (req, res) => {
  try {
    const computer = await System.updateComputer(req.body, req.user.name);
    return res.status(200).json(computer)
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listComputerHistory = async (req, res) => {
  try {
    const computer = await System.getComputerHistory(req.query);
    return res.status(200).json(computer);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listComputerFunctionalStates = async (req, res) => {
  try {
    const functional = await System.getComputerFunctionalStates();
    return res.status(200).json(functional);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listComputerConditionalStates = async (req, res) => {
  try {
    const conditional = await System.getComputerConditionalStates();
    return res.status(200).json(conditional);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createScreen = async (req, res) => {
  try {
    const screen = await System.insertScreen(req.body, req.user.name);
    return res.status(200).json(screen);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listScreens = async (req, res) => {
  try {
    const screens = await System.getScreens(req.query);
    return res.status(200).json(screens);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeScreen = async (req, res) => {
  try {
    const screen = await System.updateScreen(req.body, req.user.name);
    return res.status(200).json(screen);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createAntenna = async (req, res) => {
  try {
    const antenna = await System.insertAntenna(req.body, req.user.name);
    return res.status(200).json(antenna);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listAntennas = async (req, res) => {
  try {
    const antennas = await System.getAntennas(req.query);
    return res.status(200).json(antennas);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const changeAntenna = async (req, res) => {
  try {
    const antenna = await System.changeAntenna(req.body, req.user.name);
    return res.status(200).json(antenna);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const listAntennaHistory = async (req, res) => {
  try {
    const antennas = await System.getAntennasHistory(req.query);
    return res.status(200).json(antennas);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}

export const createPrinter = async (req, res) => {
  try {
    const printer = await System.insertPrinter(req.body, req.user.name);
    return res.status(200).json(printer);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}
export const listPrinters = async (req, res) => {
  try {
    const printer = await System.getPrinters(req.query);
    return res.status(200).json(printer);
  } catch ({ message, statusCode }) {
    res.status(statusCode).json({ msg: message, code: statusCode })
  }
}