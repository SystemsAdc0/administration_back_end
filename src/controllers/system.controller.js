import systems from "../models/systems.js";

export const getMsg = async (req, res) => {
  try {
    const msg = await systems.getUsers("jorge");
    return res.status(200).json(msg);
  } catch (error) {
    console.log(error);
  }
};
