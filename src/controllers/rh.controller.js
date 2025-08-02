import { RH } from "../models/rh.model.js";

export const createEmployee = async (req, res) => {
  try {
    const register = await RH.insertEmployee(req.body);
    return res.status(200).json(register);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode });
  }
};
