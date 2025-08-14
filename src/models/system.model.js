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

      const [[validate_SN]] = await db.query(
        "SELECT value_id FROM computers WHERE value_id = ?;",
        [value_id]
      );

      if (validate_SN)
        throw new CustomError(
          "Ya existe una computadora con ese Numero Serial/ID",
          400
        );

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

      // if (!computers.length)
      //   throw new CustomError("Error al obtener las computadoras", 400);

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

      const [[oldComputer]] = await db.query(
        "SELECT comp.id AS computer_id, comp.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, comp.computer_functional_state_id AS functional_state_id, comp.computer_conditional_state_id AS conditional_state_id, comp.updated_by AS last_updated_by, comp.updated_at AS last_updated_at FROM computers comp LEFT JOIN employees emp ON emp.id = comp.employee_id WHERE comp.id = ?;",
        [computer_id]
      );

      if (!oldComputer)
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
      } = oldComputer;

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
      if (!computer_id)
        throw new CustomError("Falta el id de la computadora", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM computers_history WHERE computer_id = ?;",
        [computer_id]
      );

      const [computer] = await db.query(
        "SELECT comp.employee_id, comp.employee_name, comp.employee_phone, comp.employee_email, comp.description, fun.name AS functional_state, cond.name AS conditional_state, comp.updated_by, comp.updated_at FROM computers_history comp LEFT JOIN computer_functional_states fun ON fun.id = comp.functional_state_id LEFT JOIN computer_conditional_states cond ON cond.id = comp.conditional_state_id WHERE comp.computer_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [computer_id, offset, size]
      );

      // if (!computer.length)
      //   throw new CustomError(
      //     "Error al obtener el historial de la computadora",
      //     400
      //   );

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

      // if (!functional_states.length)
      //   throw new CustomError(
      //     "Error al obtener los estados funcionales de las computadoras",
      //     400
      //   );

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

      // if (!conditional_states.length)
      //   throw new CustomError(
      //     "Error al obtener los estados condicionales de las computadoras",
      //     400
      //   );

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
    const { brand, model, serial_number, status } = data;
    let { computer_id } = data;
    try {
      if (!brand || !model || !serial_number || !status)
        throw new CustomError("Faltan valores para insertar el monitor.", 400);

      const [[validate_SN]] = await db.query(
        "SELECT serial_number FROM screens WHERE serial_number = ?;",
        [serial_number]
      );

      if (validate_SN)
        throw new CustomError(
          "Ya existe un monitor con ese numero serial",
          400
        );

      if (status === "En espera") computer_id = null;

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

      // if (!screens.length)
      //   throw new CustomError("Error al obtener los monitores", 400);

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
    const { screen_id, status } = data;
    let { computer_id } = data;
    try {
      if (!screen_id || !status)
        throw new CustomError("Faltan valores para actualizar el monitor", 400);

      if (status === "En espera") computer_id = null;

      const [screen] = await db.query(
        "UPDATE screens SET status = ?, computer_id = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [status, computer_id, updated_by, screen_id]
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
    const { kit_number, starlink_id, router_id, status } = data;
    let { employee_id } = data;
    try {
      if (!kit_number || !starlink_id || !router_id || !status)
        throw new CustomError("Faltan valores para insertar la antena", 400);

      const [[validate_SN]] = await db.query(
        "SELECT kit_number, starlink_id FROM antennas WHERE starlink_id = ? OR router_id = ?;",
        [kit_number, starlink_id]
      );

      if (validate_SN)
        throw new CustomError(
          "Ya existe una antena con ese Starlink ID o Numero de Kit",
          400
        );

      if (status === "En espera") employee_id = null;

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

      // if (!antennas.length)
      //   throw new CustomError("Error al obtener las antenas", 400);

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

  updateAntenna: async (data, updated_by) => {
    const { antenna_id, description, status } = data;
    let { employee_id } = data;
    try {
      if (!antenna_id || !status)
        throw new CustomError("Faltan valores para actualizar la antena", 400);

      const [[oldAntenna]] = await db.query(
        "SELECT ant.id AS antenna_id, ant.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, ant.status AS last_status, ant.updated_at AS last_updated_at, ant.updated_by AS last_updated_by FROM antennas ant LEFT JOIN employees emp ON emp.id = ant.employee_id WHERE ant.id = ?;",
        [antenna_id]
      );

      if (!oldAntenna)
        throw new CustomError(
          "No se encontro la antena que quiere actualizar",
          404
        );

      if (status === "En espera") employee_id = null;

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
      } = oldAntenna;

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

      return { msg: "Antena actualizada correctamente", code: 200 };
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
      if (!antenna_id) throw new CustomError("Falta el id de la antena", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM antennas_history WHERE antenna_id = ?;",
        [antenna_id]
      );

      const [antennas] = await db.query(
        "SELECT * FROM antennas_history WHERE antenna_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [antenna_id, offset, size]
      );

      // if (!antennas.length)
      //   throw new CustomError(
      //     "Error al obtener el historial de la antena",
      //     400
      //   );

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
    const { brand, model, serial_number, status } = data;
    let { employee_id } = data;
    try {
      if (!brand || !model || !serial_number)
        throw new CustomError("Faltan valores para insertar la impresora", 400);

      const [[validate_SN]] = await db.query(
        "SELECT serial_number FROM printers WHERE serial_number = ?;",
        [serial_number]
      );

      if (validate_SN)
        throw new CustomError(
          "Ya existe una impresora con ese numero serial",
          400
        );

      if (status === "En espera") employee_id = null;

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

      // if (!printers.length)
      //   throw new CustomError("Error al obtener las impresoras", 400);

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
    const { printer_id, description, status } = data;
    let { employee_id } = data;
    try {
      if (!printer_id || !status)
        throw new CustomError("Faltan valores para acutalizar", 400);

      const [[oldPrinter]] = await db.query(
        "SELECT prin.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, prin.status AS old_status, prin.updated_at AS last_updated_at, prin.updated_by AS last_updated_by FROM printers prin LEFT JOIN employees emp ON emp.id = prin.employee_id WHERE prin.id = ?;",
        [printer_id]
      );

      if (!oldPrinter)
        throw new CustomError(
          "No se encontro la impresora que quiere actualizar",
          404
        );

      if (status === "En espera") employee_id = null;

      const [printer] = await db.query(
        "UPDATE printers SET employee_id = ?, status = ? WHERE id = ?;",
        [employee_id, status, printer_id]
      );

      if (!printer.affectedRows)
        throw new CustomError("Error al actualizar la impresora", 400);

      const {
        employee,
        employee_name,
        employee_phone,
        employee_email,
        old_status,
        last_updated_at,
        last_updated_by,
      } = oldPrinter;

      const [printer_history] = await db.query(
        "INSERT INTO printers_history (printer_id, employee_id, employee_name, employee_phone, employee_email, description, status, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          printer_id,
          employee,
          employee_name,
          employee_phone,
          employee_email,
          description,
          old_status,
          last_updated_at,
          last_updated_by,
        ]
      );

      if (!printer_history.affectedRows)
        throw new CustomError(
          "Se actualizo la impresora, pero no se agrego al historial",
          400
        );

      return { msg: "Impresora actualizada correctamente", code: 200 };
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
  },

  getPrinterHistory: async (data) => {
    const { printer_id } = data;
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      if (!printer_id)
        throw new CustomError("Falta el id de la impresora", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM printers_history WHERE printer_id = ?;",
        [printer_id]
      );

      const [printers] = await db.query(
        "SELECT * FROM printers_history WHERE printer_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [printer_id, offset, size]
      );

      // if (!printers.length)
      //   throw new CustomError(
      //     "Error al obtener el historial de la impresora",
      //     400
      //   );

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
        "Error en el servidor al obtener el historial la impresora.",
        500
      );
    }
  },

  insertPhone: async (data, created_by) => {
    const { brand, model, imei, phone_number, status } = data;
    let { employee_id } = data;
    try {
      if (!brand || !model || !imei || !phone_number || !status)
        throw new CustomError("Faltan valores para crear el telefono", 400);

      const [[validate_SN]] = await db.query(
        "SELECT imei FROM phones WHERE imei = ?;",
        [imei]
      );

      if (validate_SN)
        throw new CustomError("Ya existe un telefono con ese imei", 400);

      if (status === "En espera") employee_id = null;

      const [phone] = await db.query(
        "INSERT INTO phones (brand, model, imei, phone_number, status, employee_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?);",
        [brand, model, imei, phone_number, status, employee_id, created_by]
      );

      if (!phone.affectedRows)
        throw new CustomError("Error no se pudo actualizar el telefono", 400);

      return { msg: "Se inserto el telefono correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al crear el telefono.", 500);
    }
  },

  getPhones: async (data) => {
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM phones;"
      );

      const [phones] = await db.query(
        "SELECT pho.id, pho.brand, pho.model, pho.imei, pho.phone_number, pho.status, pho.employee_id, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, pho.created_at, pho.created_by, pho.updated_at, pho.updated_by FROM phones pho LEFT JOIN employees emp ON emp.id = pho.employee_id ORDER BY pho.created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      // if (!phones.length)
      //   throw new CustomError("Error al obtener los telefonos", 400);

      return {
        data: phones,
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
        "Error en el servidor al obtener los telefonos.",
        500
      );
    }
  },

  updatePhone: async (data, updated_by) => {
    const { phone_id, description, phone_number, status } = data;
    let { employee_id } = data;
    try {
      if (!phone_id || !phone_number || !status)
        throw new CustomError(
          "Faltan valores para actualizar el telefono",
          400
        );

      const [[oldPhone]] = await db.query(
        "SELECT pho.employee_id AS employee, emp.name AS employee_name, emp.work_phone AS employee_phone, emp.work_email AS employee_email, pho.phone_number AS old_phone, pho.status AS old_status, pho.updated_at AS last_updated_at, pho.updated_by AS last_updated_by FROM phones pho LEFT JOIN employees emp ON emp.id = pho.employee_id WHERE pho.id = ?;",
        [phone_id]
      );

      if (!oldPhone)
        throw new CustomError(
          "No se encontro el telefono que quiere actualizar",
          404
        );

      if (status === "En espera") employee_id = null;

      const [phone] = await db.query(
        "UPDATE phones SET phone_number = ?, status = ?, employee_id = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [phone_number, status, employee_id, updated_by, phone_id]
      );

      if (!phone.affectedRows)
        throw new CustomError("Error al actualizar el telefono", 400);

      const {
        employee,
        employee_name,
        employee_phone,
        employee_email,
        old_phone,
        old_status,
        last_updated_by,
        last_updated_at,
      } = oldPhone;

      const [phone_history] = await db.query(
        "INSERT INTO phones_history (phone_id, employee_id, employee_name, employee_phone, employee_email, description, phone_number, status, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          phone_id,
          employee,
          employee_name,
          employee_phone,
          employee_email,
          description,
          old_phone,
          old_status,
          last_updated_at,
          last_updated_by,
        ]
      );

      if (!phone_history.affectedRows)
        throw new CustomError(
          "Se actualizo el telefono, pero no registro en el historial",
          400
        );

      return { msg: "Telefono actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el telefono.",
        500
      );
    }
  },

  getPhoneHistory: async (data) => {
    const { phone_id } = data;
    const page = parseInt(data.page, 10) || 1;
    const size = parseInt(data.size, 10) || 20;
    try {
      if (!phone_id) throw new CustomError("Falta el id del telefono", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM phones_history WHERE phone_id = ?;",
        [phone_id]
      );

      const [phone_history] = await db.query(
        "SELECT * FROM phones_history WHERE phone_id = ? ORDER BY updated_at DESC LIMIT ?, ?;",
        [phone_id, offset, size]
      );

      // if (!phone_history.length)
      //   throw new CustomError("Error al obtener el historial del telefono", 400);

      return {
        data: phone_history,
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
        "Error en el servidor al obtener el historial del telefono.",
        500
      );
    }
  },
};
