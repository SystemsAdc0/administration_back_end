import db from "../config/db.js";
import { CustomError } from "../middlewares/auth.middleware.js";

export const System = {
  insertComputer: async (data, created_by) => {
    const {
      brand,
      model,
      type_id,
      value_id,
      type,
      computer_functional_state_id,
      computer_conditional_state_id,
      employee_id,
    } = data;
    try {
      if (
        !brand ||
        !model ||
        !type_id ||
        !value_id ||
        !type ||
        !computer_functional_state_id ||
        !computer_conditional_state_id
      )
        throw new CustomError("Faltan valores para crear la computadora", 400);

      const [computer] = await db.query(
        "INSERT INTO computers (brand, model, type_id, value_id, type, computer_functional_state_id, computer_conditional_state_id, employee_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?);",
        [
          brand,
          model,
          type_id,
          value_id,
          type,
          computer_functional_state_id,
          computer_conditional_state_id,
          employee_id,
          created_by,
        ]
      );

      if (!computer.affectedRows)
        throw new CustomError("Error al ingresar la computadora", 400);

      return { msg: "Computadora creada exitosamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al ingresar la computadora",
        500
      );
    }
  },

  getComputers: async (data) => {
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM computers;"
      );

      const [computers] = await db.query(
        "SELECT comp.id, comp.brand, comp.model, comp.type_id, comp.value_id AS computer_id, comp.type, fun.name AS functional_state, cond.name AS conditional_name, comp.employee_id, comp.created_at, comp.created_by, comp.updated_at, comp.updated_by FROM computers comp LEFT JOIN computer_functional_states fun ON fun.id = comp.computer_functional_state_id LEFT JOIN computer_conditional_states cond ON cond.id = comp.computer_conditional_state_id ORDER BY created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!computers.length)
        throw new CustomError("Error al obtener las computadoras", 400);

      return {
        data: computers,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener las computadoras",
        500
      );
    }
  },

  updateComputer: async (data, updated_by) => {
    const {
      computer_id,
      computer_functional_state_id,
      computer_conditional_state_id,
      description,
      employee_id,
    } = data;
    try {
      if (
        !computer_id ||
        !computer_functional_state_id ||
        !computer_conditional_state_id
      )
        throw new CustomError(
          "Faltan valores para actulizar la computadora",
          400
        );

      const [oldComputer] = await db.query(
        "SELECT comp.id AS computer_id, comp.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, comp.computer_functional_state_id AS functional_state_id, comp.computer_conditional_state_id AS conditional_state_id, comp.updated_by AS last_updated_by, comp.updated_at AS last_updated_at FROM computers comp LEFT JOIN employees emp ON emp.id = comp.employee_id WHERE comp.id = ?;",
        [computer_id]
      );

      if (!oldComputer.length)
        throw new CustomError(
          "La computadora que quiere actualizar no se encontro",
          404
        );

      const [computer] = await db.query(
        "UPDATE computers SET computer_functional_state_id = ?, computer_conditional_state_id = ?, employee_id = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [
          computer_functional_state_id,
          computer_conditional_state_id,
          employee_id,
          updated_by,
          computer_id,
        ]
      );

      if (!computer.affectedRows)
        throw new CustomError("Error al actualizar la computadora", 400);

      const {
        employee,
        employee_name,
        employee_phone,
        employee_email,
        functional_state_id,
        conditional_state_id,
        last_updated_by,
        last_updated_at,
      } = oldComputer[0];

      const [history] = await db.query(
        "INSERT INTO computers_history (computer_id, employee_id, employee_name, employee_phone, employee_email, description, functional_state_id, conditional_state_id, updated_by, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          computer_id,
          employee,
          employee_name,
          employee_phone,
          employee_email,
          description,
          functional_state_id,
          conditional_state_id,
          last_updated_by,
          last_updated_at,
        ]
      );

      if (!history.affectedRows)
        throw new CustomError(
          "Se actualizo la computadora, pero no se registro en el historial",
          400
        );

      return { msg: "Computadora actualizada correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar la computadora",
        500
      );
    }
  },

  getComputerHistory: async (data) => {
    const { computer_id } = data;
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM computers_history WHERE computer_id = ?;",
        [computer_id]
      );

      const [computer] = await db.query(
        "SELECT comp.employee_id, comp.employee_name, comp.employee_phone, comp.employee_email, comp.description, fun.name AS functional_state, cond.name AS conditional_state, comp.updated_by, comp.updated_at FROM computers_history comp LEFT JOIN computer_functional_states fun ON fun.id = comp.functional_state_id LEFT JOIN computer_conditional_states cond ON cond.id = comp.conditional_state_id WHERE comp.computer_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [computer_id, offset, size]
      );

      if (!computer.length)
        throw new CustomError(
          "Error al obtener el historial de la computadora",
          400
        );

      return {
        data: computer,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener el historial de la computadora",
        500
      );
    }
  },

  getComputerFunctionalStates: async () => {
    try {
      const [functional_states] = await db.query(
        "SELECT * FROM computer_functional_states;"
      );

      if (!functional_states.length)
        throw new CustomError(
          "Error al obtener los estados funcionales de las computadoras",
          400
        );

      return functional_states;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los estados funcionales de las computadoras.",
        500
      );
    }
  },

  getComputerConditionalStates: async () => {
    try {
      const [conditional_states] = await db.query(
        "SELECT * FROM computer_conditional_states;"
      );

      if (!conditional_states.length)
        throw new CustomError(
          "Error al obtener los estados condicionales de las computadoras",
          400
        );

      return conditional_states;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los estados condicionales de las computadoras.",
        500
      );
    }
  },

  insertScreen: async (data, created_by) => {
    const { brand, model, serial_number, status, computer_id } = data;
    try {
      if (!brand || !model || !serial_number || !status)
        throw new CustomError("Faltan valores para insertar el monitor.", 400);

      const [screen] = await db.query(
        "INSERT INTO screens (brand, model, serial_number, status, computer_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, NOW(), ?);",
        [brand, model, serial_number, status, computer_id, created_by]
      );

      if (!screen.affectedRows)
        throw new CustomError("Error al insertar el monitor", 400);

      return { msg: "Monitor insertado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar el monitor.",
        500
      );
    }
  },

  getScreens: async (data) => {
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM screens;"
      );

      const [screens] = await db.query(
        "SELECT * FROM screens ORDER BY created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!screens.length)
        throw new CustomError("Error al obtener los monitores", 400);

      return {
        data: screens,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los monitores.",
        500
      );
    }
  },

  updateScreen: async (data, updated_by) => {
    const { screen_id, brand, model, status, computer_id } = data;
    try {
      if (!screen_id || !brand || !model || !status)
        throw new CustomError("Faltan valores para actualizar el monitor", 400);

      const [screen] = await db.query(
        "UPDATE screens SET brand = ?, model = ?, status = ?, computer_id = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [brand, model, status, computer_id, updated_by, screen_id]
      );

      if (!screen.affectedRows)
        throw new CustomError("Error al actualizar el monitor", 400);

      return { msg: "Monitor actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el monitor.",
        500
      );
    }
  },

  insertAntenna: async (data, created_by) => {
    const { kit_number, starlink_id, router_id, status, employee_id } = data;
    try {
      if (!kit_number || !starlink_id || !router_id || !status)
        throw new CustomError("Faltan valores para insertar la antena", 400);

      const [antena] = await db.query(
        "INSERT INTO antennas (kit_number, starlink_id, router_id, status, employee_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, NOW(), ?);",
        [kit_number, starlink_id, router_id, status, employee_id, created_by]
      );

      if (!antena.affectedRows)
        throw new CustomError("Error al insertar la antena", 400);

      return { msg: "Antena insertada correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al insertar la antena.", 500);
    }
  },

  getAntennas: async (data) => {
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM antennas;"
      );

      const [antennas] = await db.query(
        "SELECT ant.id, ant.kit_number, ant.starlink_id, ant.router_id, ant.status, ant.employee_id, emp.name AS employee_name, emp.work_phone AS employee_phone, ant.created_at, ant.created_by, ant.updated_at, ant.updated_by FROM antennas ant LEFT JOIN employees emp ON emp.id = ant.employee_id ORDER BY created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!antennas.length)
        throw new CustomError("Error al obtener las antenas", 400);

      return {
        data: antennas,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener las antenas.",
        500
      );
    }
  },

  changeAntenna: async (data, updated_by) => {
    const { antenna_id, employee_id, description, status } = data;
    try {
      if (!antenna_id || !employee_id || !status)
        throw new CustomError("Faltan valores para actualizar la antena", 400);

      const [oldAntenna] = await db.query(
        "SELECT ant.id AS antenna_id, ant.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, ant.status AS last_status, ant.updated_at AS lat_updated_at, ant.updated_by AS last_updated_by FROM antennas ant LEFT JOIN employees emp ON emp.id = ant.employee_id WHERE ant.id = ?;",
        [antenna_id]
      );

      if (!oldAntenna.length)
        throw new CustomError(
          "No se encontro la antena que quiere actualizar",
          404
        );

      const [antenna] = await db.query(
        "UPDATE antennas SET employee_id = ?, status = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [employee_id, status, updated_by, antenna_id]
      );

      const {
        employee,
        employee_name,
        employee_phone,
        employee_email,
        last_status,
        last_updated_at,
        last_updated_by,
      } = oldAntenna[0];

      if (!antenna.affectedRows)
        throw new CustomError("Error al actualizar la antena", 400);

      const [antenna_history] = await db.query(
        "INSERT INTO antennas_history (antenna_id, employee_id, employee_name, employee_phone, employee_email, description, status, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          antenna_id,
          employee,
          employee_name,
          employee_phone,
          employee_email,
          description,
          last_status,
          last_updated_at,
          last_updated_by,
        ]
      );

      if (!antenna_history.affectedRows)
        throw new CustomError(
          "Se actualizo la antena, pero no se agrego al historial",
          400
        );

      return { msg: "Antena actualizada correcta,emte", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar la antena.",
        500
      );
    }
  },

  getAntennasHistory: async (data) => {
    const { antenna_id } = data;
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM antennas_history WHERE antenna_id = ?;",
        [antenna_id]
      );

      const [antennas] = await db.query(
        "SELECT * FROM antennas_history WHERE antenna_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [antenna_id, offset, size]
      );

      if (!antennas.length)
        throw new CustomError(
          "Error al obtener el historial de la antena",
          400
        );

      return {
        data: antennas,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener el historial de la antena.",
        500
      );
    }
  },

  insertPrinter: async (data, created_by) => {
    const { brand, model, serial_number, status, employee_id } = data;
    try {
      if (!brand || !model || !serial_number)
        throw new CustomError("Faltan valores para insertar la impresora", 400);

      const [printer] = await db.query(
        "INSERT INTO printers (brand, model, serial_number, status, employee_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, NOW(), ?);",
        [brand, model, serial_number, status, employee_id, created_by]
      );

      if (!printer.affectedRows)
        throw new CustomError("Error al insertar la impresora", 400);

      return { msg: "Impresora insertada correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar la impresora.",
        500
      );
    }
  },

  getPrinters: async (data) => {
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM printers;"
      );

      const [printers] = await db.query(
        "SELECT prin.id, prin.brand, prin.model, prin.serial_number, prin.status, prin.employee_id, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, prin.created_at, prin.created_by, prin.updated_at, prin.updated_by FROM printers prin LEFT JOIN employees emp ON emp.id = prin.employee_id ORDER BY created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!printers.length)
        throw new CustomError("Error al obtener las impresoras", 400);

      return {
        data: printers,
        meta: {
          page: page,
          size: size,
          totalItems: total,
          totalPages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener las impresoras.",
        500
      );
    }
  },

  updatePrinter: async (data, updated_by) => {
    const { printer_id, employee_id, description, status } = data;
    try {
      if (!printer_id || !employee_id || !status)
        throw new CustomError("Faltan valores para acutalizar", 400);

      const [oldPrinter] = await db.query("SELECT prin.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, prin.status, prin.updated_at, prin.updated_by FROM printes prin LEFT JOIN employees emp ON emp.id = prin.employee_id;")
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar la impresora.",
        500
      );
    }
  }
};
