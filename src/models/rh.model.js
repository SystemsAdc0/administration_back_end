import db from "../config/db.js";
import { CustomError } from "../middlewares/auth.middleware.js";

export const RH = {
  insertEmployee: async (data) => {
    const { name, start_date, position, department, ubication, personal_phone, personal_email, nss, curp, rfc, address, daily_salary, net_salary, bank, code_bank, status, shift } = data;
    try {
      if (!name || !start_date || !position || !department || !ubication || !personal_phone || !personal_email || !nss || !curp || !rfc || !address || !daily_salary || !net_salary || !bank || !code_bank || !status || !shift) {
        throw new CustomError("Falta valores para crear al empleado", 400);
      }

      const [response] = await db.query("INSERT INTO employees (name, start_date, position, department, ubication, personal_phone, personal_email, nss, curp, rfc, address, daily_salary, net_salary, bank, code_bank, status, shift) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        name, start_date, position, department, ubication, personal_phone, personal_email, nss, curp, rfc, address, daily_salary, net_salary, bank, code_bank, status, shift
      ]);
      
      if (!response.affectedRows) {
        throw new CustomError("Error al crear el empleado", 400);
      }
      return { msg: "Empleado creado correctamente", code: 200 }
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        return error;
      }
      throw new CustomError("Error en el servidor", 500);
    }
  },

  updateEmployeeStatus: async (data) => {
    const { status, id } = data;
    try {
      if (!status || !id) {
        throw new CustomError("Falta status para actualizar", 400);
      }
      const [response] = await db.query("UPDATE employees SET status = ? WHERE id = ?;", [status, id]);

      if (response.affectedRows === 0)
        throw new CustomError("Error al actualizar status del empleado", 400
      )
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        return error;
      }
      throw new CustomError("Error en el servidor", 500);
    }
  }
};
