import { RH } from "../models/rh.model.js";

export const pruebadepetiociones = async (req, res) => {
  try {
    const register = await RH.createEmployee(req.body);
    res.status(200).json(register);
  } catch ({ message, statusCode = 500 }) {
    res.status(statusCode).json({ msg: message, code: statusCode });
  }
};
