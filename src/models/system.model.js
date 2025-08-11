import db from "../config/db.js";
import { CustomError } from "../middlewares/auth.middleware.js";

export const System = {
  getUsers: async (name) => {
    return `es ${name}`;
  },
};
