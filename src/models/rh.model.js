import db from "../config/db.js";
import { CustomError } from "../middlewares/auth.middleware.js";

export const RH = {
  createEmployee: async (data) => {
    const { first_name, last_name } = data;
    try {
      if (!first_name || !last_name ||!) {
        throw new CustomError("falta de valores al crear el empleado", 400);
      }

      return `nombre: ${first_name} , apaellido: ${last_name}`;
    } catch (error) {
      if (error instanceof CustomError) {
        return error;
      }
      throw new CustomError("error en el servidor", 500);
    }
  },
};
