import db from "../config/db.js";
import { CustomError } from "../middlewares/auth.middleware.js";

export const RH = {
  insertEmployee: async (data, created_by) => {
    const {
      employee_id,
      name,
      start_date,
      position,
      department,
      ubication,
      personal_phone,
      personal_email,
      nss,
      curp,
      rfc,
      address,
      daily_salary,
      net_salary,
      bank,
      code_bank,
      shift,
      work_email,
      birth_place,
      birth_date,
      nationality,
      can_travel,
      car_id,
      marital_status,
      infonavit_type,
      infonavit_number,
      work_site_id,
      return_home,
      degree,
      work_phone,
      medicals,
      allergies,
      medications,
      diseases,
      languages,
      educations,
    } = data;
    try {
      if (
        !employee_id ||
        !name ||
        !start_date ||
        !position ||
        !department ||
        !ubication ||
        !personal_phone ||
        !personal_email ||
        !nss ||
        !curp ||
        !rfc ||
        !address ||
        !daily_salary ||
        !net_salary ||
        !bank ||
        !code_bank ||
        !shift ||
        !medicals
      ) {
        throw new CustomError("Falta valores para crear al empleado", 400);
      }

      const [checkEmailAndCodeBank] = await db.query(
        "SELECT personal_email, code_bank FROM employees WHERE personal_email = ? OR code_bank = ?",
        [personal_email, code_bank]
      );

      if (checkEmailAndCodeBank.length > 0) {
        throw new CustomError(
          "Correo personal o CLABE de banco ya estan registrados en la base de datos.",
          400
        );
      }

      const [response] = await db.query(
        "INSERT INTO employees (id, name, start_date, position, department, ubication, personal_phone, personal_email, nss, curp, rfc, address, daily_salary, net_salary, bank, code_bank, shift, work_email, birth_place, birth_date, nationality, can_travel, car_id, marital_status, infonavit_type, infonavit_number, work_site_id, return_home, degree, work_phone, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          employee_id,
          name,
          start_date,
          position,
          department,
          ubication,
          personal_phone,
          personal_email,
          nss,
          curp,
          rfc,
          address,
          daily_salary,
          net_salary,
          bank,
          code_bank,
          shift,
          work_email,
          birth_place,
          birth_date,
          nationality,
          can_travel,
          car_id,
          marital_status,
          infonavit_type,
          infonavit_number,
          work_site_id,
          return_home,
          degree,
          work_phone,
          created_by,
        ]
      );

      if (!response.affectedRows) {
        throw new CustomError("Error al crear el empleado", 400);
      }

      const {
        current_health,
        blood_type,
        emergency_contact_name,
        emergency_contact_phone,
        relationship,
      } = medicals;

      if (
        !current_health ||
        !blood_type ||
        !emergency_contact_name ||
        !emergency_contact_phone ||
        !relationship
      )
        throw new CustomError(
          "Empleado creado exitosamente, pero faltan datos de salud del empleado, necesita agregarlos",
          400
        );

      const [health] = await db.query(
        "INSERT INTO healths (employee_id, current_health, blood_type, emergency_contact_name, emergency_contact_phone, relationship) VALUES (?, ?, ?, ?, ?, ?)",
        [
          employee_id,
          current_health,
          blood_type,
          emergency_contact_name,
          emergency_contact_phone,
          relationship,
        ]
      );

      if (!health.affectedRows) {
        throw new CustomError(
          "Empleado creado exitosamente, pero sus datos de salud no se guardaron, necesita agregarlos",
          400
        );
      }

      if (allergies.length > 0) {
        for (let allergie of allergies) {
          if (allergie.name) {
            await db.query(
              "INSERT INTO allergies (employee_id, name, description) VALUES (?, ?, ?);",
              [employee_id, allergie.name, allergie.description]
            );
            console.log("🆕 Alergia insertada");
          }
        }
      }

      if (medications.length > 0) {
        for (let medication of medications) {
          if (medication.name) {
            await db.query(
              "INSERT INTO medications (employee_id, name, description) VALUES (?, ?, ?);",
              [employee_id, medication.name, medication.description]
            );
            console.log("🆕 Medicamento insertado");
          }
        }
      }

      if (diseases.length > 0) {
        for (let disease of diseases) {
          if (disease.name) {
            await db.query(
              "INSERT INTO diseases (employee_id, name, description) VALUES (?, ?, ?);",
              [employee_id, disease.name, disease.description]
            );
            console.log("🆕 Enfermedad insertada");
          }
        }
      }

      if (languages.length > 0) {
        for (let lan of languages) {
          if (lan.name) {
            await db.query(
              "INSERT INTO languages (employee_id, name, level) VALUES (?, ?, ?);",
              [employee_id, lan.name, lan.level]
            );
            console.log("🆕 Idioma insertado");
          }
        }
      }

      if (educations.length > 0) {
        for (let edu of educations) {
          if (edu.name) {
            await db.query(
              "INSERT INTO educations (employee_id, name, level) VALUES (?, ?, ?);",
              [employee_id, edu.name, edu.level]
            );
            console.log("🆕 Educación insertada");
          }
        }
      }

      return { msg: "Empleado creado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al crear el empleado", 500);
    }
  },

  updateEmployee: async (data, updated_by) => {
    const {
      employee_id,
      name,
      start_date,
      position,
      department,
      ubication,
      personal_phone,
      personal_email,
      nss,
      curp,
      rfc,
      address,
      bank,
      code_bank,
      shift,
      work_email,
      birth_place,
      birth_date,
      nationality,
      can_travel,
      car_id,
      marital_status,
      infonavit_type,
      infonavit_number,
      work_site_id,
      return_home,
      degree,
      work_phone,
    } = data;
    try {
      if (
        [
          employee_id,
          name,
          start_date,
          position,
          department,
          ubication,
          personal_phone,
          personal_email,
          nss,
          curp,
          rfc,
          address,
          bank,
          code_bank,
          shift,
        ].some((val) => val == null)
      )
        throw new CustomError("Falta valores para actualizar al empleado", 400);

      const [checkEmail] = await db.query(
        "SELECT personal_email FROM employees WHERE personal_email = ?",
        [personal_email]
      );

      const [checkCodeBank] = await db.query(
        "SELECT code_bank FROM employees WHERE code_bank = ?",
        [code_bank]
      );

      if (checkEmail.length || checkCodeBank.length) {
        throw new CustomError(
          `${
            checkEmail.length && checkCodeBank.length
              ? "Correo y CLABE de banco ya estan registrados"
              : checkCodeBank.length
              ? "CLABE de banco ya registrado"
              : "Correo ya registrado"
          }`,
          400
        );
      }

      const [res] = await db.query(
        "UPDATE employees SET name = ?, start_date = ?, position = ?, department = ?, ubication = ?, personal_phone = ?, personal_email = ?, nss = ?, curp = ?, rfc = ?, address = ?, bank = ?, code_bank = ?, shift = ?, work_email = ?, birth_place = ?, birth_date = ?, nationality = ?, can_travel = ?, car_id = ?, marital_status = ?, infonavit_type = ?, infonavit_number = ?, work_site_id = ?, return_home = ?, degree = ?, work_phone = ?, updated_at = NOW(), updated_by = ? WHERE id = ?;",
        [
          name,
          start_date,
          position,
          department,
          ubication,
          personal_phone,
          personal_email,
          nss,
          curp,
          rfc,
          address,
          bank,
          code_bank,
          shift,
          work_email,
          birth_place,
          birth_date,
          nationality,
          can_travel,
          car_id,
          marital_status,
          infonavit_type,
          infonavit_number,
          work_site_id,
          return_home,
          degree,
          work_phone,
          updated_by,
          employee_id,
        ]
      );

      if (!res.affectedRows) {
        throw new CustomError("Error al actualizar status del empleado", 400);
      }
      return { msg: "Empleado actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el empleado",
        500
      );
    }
  },

  updateEmployeeStatus: async (data, created_by) => {
    const { status, employee_id, description, start_date, end_date } = data;
    try {
      if (!status || !employee_id) {
        throw new CustomError(
          "Falta status o id del empleado para actualizar",
          400
        );
      }

      if (
        ["Vacaciones", "Incidente"].includes(status) &&
        (!description || !start_date || !end_date)
      ) {
        throw new CustomError(
          "Faltan valores para actualizar a ese estado",
          400
        );
      }

      if (["Vacaciones", "Incidente"].includes(status)) {
        const startDateConverted = new Date(start_date);
        const endDateConverted = new Date(end_date);

        const [statusHistory] = await db.query(
          "INSERT INTO status_history (description, type, start_date, end_date, employee_id, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW());",
          [
            description,
            status,
            startDateConverted,
            endDateConverted,
            employee_id,
            created_by,
          ]
        );

        if (!statusHistory.affectedRows)
          throw new CustomError("Error al actualizar status del empleado", 400);
      }

      const [updateStatus] = await db.query(
        "UPDATE employees SET status = ?, updated_by = ?, updated_at = NOW() WHERE id = ?;",
        [status, created_by, employee_id]
      );

      if (!updateStatus.affectedRows)
        throw new CustomError("Error al actualizar status del empleado", 400);

      return { msg: "Status actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar status del empleado",
        500
      );
    }
  },

  updateEmployeeSalary: async (data, created_by) => {
    const { employee_id, description, new_salary } = data;
    try {
      if (!employee_id || !new_salary)
        throw new CustomError("Faltan datos para hacer el ajuste salarial");

      const [previous_salary] = await db.query(
        "SELECT daily_salary FROM employees WHERE id = ?;",
        [employee_id]
      );

      if (parseFloat(previous_salary[0].daily_salary) === new_salary)
        throw new CustomError(
          "El salario nuevo no debe de ser igual al salario actual.",
          400
        );

      const [adjusment] = await db.query(
        "UPDATE employees SET daily_salary = ?, updated_by = ?, updated_at = NOW() WHERE id = ?",
        [new_salary, created_by, employee_id]
      );

      if (!adjusment.affectedRows)
        throw new CustomError(
          "Error al actualizar el salario del empleado",
          400
        );

      const [adjustmentHistory] = await db.query(
        "INSERT INTO adjusments_salaries (description, previous_salary, new_salary, employee_id, created_by, created_at) VALUES (?, ?, ?, ?, ?, NOW());",
        [
          description,
          previous_salary[0].daily_salary,
          new_salary,
          employee_id,
          created_by,
        ]
      );

      if (!adjustmentHistory.affectedRows)
        throw new CustomError(
          "Se ajusto el salario del empleado, pero no se agrego al historial",
          400
        );

      return {
        msg: "Ajuste salarial del empleado hecho exitosamente",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el salario del empleado",
        500
      );
    }
  },

  getEmployees: async (data) => {
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;

    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM employees WHERE status = 'Activo'"
      );
      const [listEmployees] = await db.query(
        "SELECT * FROM employees WHERE status = 'Activo' ORDER BY id DESC LIMIT ?, ?;",
        [offset, size]
      );

      return {
        data: listEmployees,
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
      throw new CustomError("Error en el servidor al obtener empleados", 500);
    }
  },

  getEmployeesByStatus: async (data) => {
    const { status } = data;
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;

    try {
      if (!status) {
        throw new CustomError("Falta estatus para obtener los empleados", 400);
      }

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM employees WHERE status = ?;",
        [status]
      );

      const [res] = await db.query(
        "SELECT * FROM employees WHERE status = ? ORDER BY id DESC LIMIT ?, ?",
        [status, offset, size]
      );

      return {
        data: res,
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
        "Error en el servidor al obtener empleados por estatus",
        500
      );
    }
  },

  getEmployeeById: async (employee_id) => {
    try {
      if (!employee_id) throw new CustomError("Falta el id del empleado", 400);

      const [employee] = await db.query(
        "SELECT * FROM employees WHERE id = ?;",
        [employee_id]
      );

      let newList = [];

      const [healths] = await db.query(
        "SELECT current_health, blood_type, emergency_contact_name, emergency_contact_phone, relationship FROM healths WHERE employee_id = ?;",
        [employee_id]
      );
      const [allergies] = await db.query(
        "SELECT name, description FROM allergies WHERE employee_id = ?;",
        [employee_id]
      );
      const [medications] = await db.query(
        "SELECT name, description FROM medications WHERE employee_id = ?;",
        [employee_id]
      );
      const [diseases] = await db.query(
        "SELECT name, description FROM diseases WHERE employee_id = ?;",
        [employee_id]
      );
      const [languages] = await db.query(
        "SELECT name, level FROM languages WHERE employee_id = ?;",
        [employee_id]
      );
      const [educations] = await db.query(
        "SELECT name, level FROM educations WHERE employee_id = ?;",
        [employee_id]
      );
      const [documents] = await db.query(
        "SELECT id, file_name, type FROM documents WHERE employee_id = ?;",
        [employee_id]
      );
      const [employeeContract] = await db.query(
        "SELECT c.name, emp.end_date FROM employee_contracts emp JOIN contracts c ON c.id = emp.contract_id WHERE employee_id = ?",
        [employee_id]
      );
      newList.push({
        ...employee[0],
        healths: healths,
        allergies: allergies,
        medications: medications,
        diseases: diseases,
        languages: languages,
        educations: educations,
        documents: documents,
        contract: employeeContract,
      });

      return newList[0];
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener el empleado por id",
        500
      );
    }
  },

  deleteEmployee: async (employee_id, updated_by) => {
    try {
      if (!employee_id)
        throw new CustomError("Falta id del empleado para darlo de baja", 400);

      const [delEmployee] = await db.query(
        "UPDATE employees SET status = 'Baja', updated_by = ?, updated_at = NOW() WHERE id = ?",
        [updated_by, employee_id]
      );

      if (!delEmployee.affectedRows)
        throw new CustomError("Error al dar de baja al empleado", 400);

      return { msg: "Emplado dado de baja exitosamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al dar de baja empleado",
        500
      );
    }
  },

  insertHealthEmployee: async (data) => {
    const {
      employee_id,
      current_health,
      blood_type,
      emergency_contact_name,
      emergency_contact_phone,
      relationship,
    } = data;
    try {
      if (
        !employee_id ||
        !current_health ||
        !emergency_contact_name ||
        !emergency_contact_phone
      )
        throw new CustomError("Falta datos de salud del empleado", 400);

      const [id] = await db.query(
        "SELECT employee_id FROM healths WHERE employee_id = ?;",
        [employee_id]
      );

      if (id.length)
        throw new CustomError("Ya existe un registro de salud", 400);

      const [health] = await db.query(
        "INSERT INTO healths (employee_id, current_health, blood_type, emergency_contact_name, emergency_contact_phone, relationship) VALUES (?, ?, ?, ?, ?, ?)",
        [
          employee_id,
          current_health,
          blood_type,
          emergency_contact_name,
          emergency_contact_phone,
          relationship,
        ]
      );

      if (!health.affectedRows)
        throw new CustomError(
          "Error al insertar los datos de salud del empleado",
          400
        );

      return {
        msg: "Datos de salud del empleado insertados exitosamente",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar los datos de salud del empleado",
        500
      );
    }
  },

  updateHealthEmployee: async (data) => {
    const {
      employee_id,
      current_health,
      blood_type,
      emergency_contact_name,
      emergency_contact_phone,
      relationship,
    } = data;
    try {
      if (!employee_id) throw new CustomError("Falta el id del empleado", 400);

      const [health] = await db.query(
        "UPDATE healths SET current_health = ?, blood_type = ?, emergency_contact_name = ?, emergency_contact_phone = ?, relationship = ? WHERE employee_id = ?;",
        [
          current_health,
          blood_type,
          emergency_contact_name,
          emergency_contact_phone,
          relationship,
          employee_id,
        ]
      );

      if (!health.affectedRows)
        throw new CustomError(
          "Error al actualizar los datos de salud del empleado",
          400
        );

      return {
        msg: "Datos de salud del empleado actualizados exitosamente",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar los datos de salud del empleado",
        500
      );
    }
  },

  insertAllergie: async (data) => {
    const { employee_id, name, description } = data;
    try {
      if (!employee_id || !name)
        throw new CustomError(
          "Falta el id del empleado o el nombre de la alergia",
          400
        );

      const [allergie] = await db.query(
        `INSERT INTO allergies (employee_id, name, description) VALUES (?, ?, ?);`,
        [employee_id, name, description]
      );

      if (!allergie.affectedRows)
        throw new CustomError("Error al insertar alergia del empleado", 400);

      return { msg: "Alergia insertada correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar la alergia del empleado",
        500
      );
    }
  },

  insertMedication: async (data) => {
    const { employee_id, name, description } = data;
    try {
      if (!employee_id || !name)
        throw new CustomError(
          "Falta el id del empleado o el nombre del medicamento",
          400
        );

      const [medication] = await db.query(
        `INSERT INTO medications (employee_id, name, description) VALUES (?, ?, ?);`,
        [employee_id, name, description]
      );

      if (!medication.affectedRows)
        throw new CustomError(
          "Error al insertar el medicamento del empleado",
          400
        );

      return { msg: "Medicamento insertado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar el medicamento del empleado",
        500
      );
    }
  },

  insertDisease: async (data) => {
    const { employee_id, name, description } = data;
    try {
      if (!employee_id || !name)
        throw new CustomError(
          "Falta el id del empleado o el nombre de la enfermedad",
          400
        );

      const [disease] = await db.query(
        `INSERT INTO diseases (employee_id, name, description) VALUES (?, ?, ?);`,
        [employee_id, name, description]
      );

      if (!disease.affectedRows)
        throw new CustomError(
          "Error al insertar la enfermedad del empleado",
          400
        );

      return { msg: "Enfermedad insertada correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar la enfermedad del empleado",
        500
      );
    }
  },

  insertEducation: async (data) => {
    const { employee_id, name, level } = data;
    try {
      if (!employee_id || !name)
        throw new CustomError(
          "Falta el id del empleado o el nombre de la carrera",
          400
        );

      const [option] = await db.query(
        `INSERT INTO educations (employee_id, name, level) VALUES (?, ?, ?);`,
        [employee_id, name, level]
      );

      if (!option.affectedRows)
        throw new CustomError("Error al insertar educación del empleado", 400)

      return { msg: "Educación insertado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar la educación/idioma del empleado",
        500
      );
    }
  },

  insertLanguange: async (data) => {
    const { employee_id, name, level } = data;
    try {
      if (!employee_id || !name)
        throw new CustomError(
          "Falta el id del empleado o el nombre de la carrera/idioma",
          400
        );

      const [language] = await db.query(
        `INSERT INTO languages (employee_id, name, level) VALUES (?, ?, ?);`,
        [employee_id, name, level]
      );

      if (!language.affectedRows)
        throw new CustomError("Error al insertar idioma del empleado", 400);

      return { msg: "Idioma insertado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al insertar la idioma del empleado",
        500
      );
    }
  },

  // insertStatusHistoryEmployee: async (data, created_by) => {
  //   const { description, type, start_date, end_date, employee_id } = data;
  //   try {
  //     if (!description || !type || !start_date || !end_date || !employee_id)
  //       throw new CustomError("Faltan datos del estatus del empleado", 400);

  //     const startDateConverted = new Date(start_date);
  //     const endDateConverted = new Date(end_date);

  //     const [status] = await db.query(
  //       "INSERT INTO status_history (description, type, start_date, end_date, employee_id, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW());",
  //       [
  //         description,
  //         type,
  //         startDateConverted,
  //         endDateConverted,
  //         employee_id,
  //         created_by,
  //       ]
  //     );

  //     if (!status.affectedRows)
  //       throw new CustomError("Error al crear estatus del empleado", 400);

  //     return { msg: "Estatus del empleado creado exitosamente", code: 200 };
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw new CustomError(
  //       "Error en el servidor al insertar el estatus del empleado",
  //       500
  //     );
  //   }
  // },

  getStatusHistoryByType: async (data) => {
    const { status } = data;
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;
    try {
      if (!status)
        throw new CustomError("Falta el tipo para obtener los datos", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM status_history sh JOIN employees emp ON emp.id = sh.employee_id WHERE sh.type = ?",
        [status]
      );

      const [statusList] = await db.query(
        "SELECT sh.*, emp.name AS employee_name, emp.department, emp.ubication, emp.position FROM status_history sh JOIN employees emp ON emp.id = sh.employee_id WHERE sh.type = ? ORDER BY emp.id DESC LIMIT ?, ?;",
        [status, offset, size]
      );

      if (!statusList.length)
        throw new CustomError("No se encontraron datos con ese tipo", 404);

      return {
        data: statusList,
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
        "Error en el servidor al obtener el historial de status de empleados",
        500
      );
    }
  },

  getStatusHistoryByEmployeeId: async (data) => {
    const { id } = data;
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;
    try {
      if (!id)
        throw new CustomError(
          "Falta el id del empleado para obtener sus datos",
          400
        );

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM status_history WHERE employee_id = ?;", [id]
      );

      const [statusList] = await db.query(
        "SELECT * FROM status_history WHERE employee_id = ? ORDER BY created_at DESC LIMIT ?, ?;",
        [id, offset, size]
      );

      if (!statusList.length)
        throw new CustomError(
          "No se encontraron datos para este empleado",
          404
        );

      return {
        data: statusList,
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
        "Error en el servidor al obtener el historial de status de empleado",
        500
      );
    }
  },

  // insertAdjustmentSalarie: async (data) => {
  //   const { description, new_salary, employee_id } = data;
  //   try {
  //     if (!description || !new_salary || !employee_id)
  //       throw new CustomError(
  //         "Faltan valores para hacer el ajuste salarial",
  //         400
  //       );

  //     /* -- TEMPORAL --  */
  //     const created_at = new Date();
  //     const created_by = "Adan";

  //     const [previous_salary] = await db.query(
  //       "SELECT daily_salary FROM employees WHERE id = ?;",
  //       [employee_id]
  //     );

  //     const [adjustment] = await db.query(
  //       "INSERT INTO adjusments_salaries (description, previous_salary, new_salary, employee_id, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?);",
  //       [
  //         description,
  //         previous_salary[0].daily_salary,
  //         new_salary,
  //         employee_id,
  //         created_by,
  //         created_at,
  //       ]
  //     );

  //     if (!adjustment.affectedRows)
  //       throw new CustomError("Error al insertar el ajuste salarial", 400);

  //     return { msg: "Ajuste salarial hecho correctamente", code: 200 };
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw new CustomError(
  //       "Error en el servidor al insertar el ajuste salarial del empleado",
  //       500
  //     );
  //   }
  // },

  getAdjusmentSalaries: async (data) => {
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM adjusments_salaries ads JOIN employees emp ON emp.id = ads.employee_id;"
      );

      const [list] = await db.query(
        "SELECT name AS employee_name, department, ubication, position, ads.* FROM adjusments_salaries ads JOIN employees emp ON emp.id = ads.employee_id ORDER BY ads.created_at DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!list.length)
        throw new CustomError(
          "No se encontraron datos de ajustes salariales",
          404
        );

      return {
        data: list,
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
        "Error en el servidor al obtener los ajustes salariales",
        500
      );
    }
  },

  // AGREGAR PAGINACIÓN
  getAdjusmentSalariesByEmployeeId: async (employee_id) => {
    try {
      if (!employee_id) throw new CustomError("Falta id del empleado", 400);

      const [list] = await db.query(
        "SELECT * FROM adjusments_salaries WHERE employee_id = ?;",
        [employee_id]
      );

      if (!list.length)
        throw new CustomError(
          "No se encontraron datos para este empleado",
          404
        );

      return list;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los ajustes salariales del empleado",
        500
      );
    }
  },

  insertLodging: async (data, created_by) => {
    const {
      lodging_name,
      description,
      travel_support,
      state,
      location,
      employee_id,
    } = data;
    try {
      if (!lodging_name || !state || !location || !employee_id)
        throw new CustomError("Faltan valores para crear el hospedaje", 400);

      const [lodging] = await db.query(
        "INSERT INTO lodgings (lodging_name, description, travel_support, state, location, employee_id, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());",
        [
          lodging_name,
          description,
          travel_support,
          state,
          location,
          employee_id,
          created_by,
        ]
      );

      if (!lodging.affectedRows)
        throw new CustomError("Error al crear el hospedaje", 400);

      return { msg: "Hospedaje creado exitosamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al crear el hospedaje", 500);
    }
  },

  getLodgings: async (data) => {
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;
    try {
      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query(
        "SELECT COUNT(*) AS total FROM lodgings;"
      );

      const [list] = await db.query(
        "SELECT lodging_name, description, travel_support, state, location, employee_id, created_by, created_at FROM lodgings ORDER BY id DESC LIMIT ?, ?;",
        [offset, size]
      );

      if (!list.length) throw new CustomError("No se encontraron datos", 404);

      return {
        data: list,
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
        "Error en el servidor al obtener los hospedajes",
        500
      );
    }
  },

  getLodgingsByEmployeeId: async (data) => {
    const { id } = data;
    const size = parseInt(data.size, 10) || 20;
    const page = parseInt(data.page, 10) || 1;
    try {
      if (!id) throw new CustomError("Falta id del empleado", 400);

      const offset = (page - 1) * size;

      const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM lodgings WHERE employee_id = ?;", [id])

      const [lodgings] = await db.query(
        "SELECT lodging_name, description, travel_support, state, location, employee_id, created_by, created_at FROM lodgings WHERE employee_id = ? ORDER BY created_at DESC LIMIT ?, ?;",
        [id, offset, size]
      );

      if (!lodgings.length)
        throw new CustomError("No se encontraron datos para ese empleado", 404);

      return {
        data: lodgings,
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
        "Error en el servidor al obtener los hospedajes del empleado",
        500
      );
    }
  },

  insertDocument: async (data, created_by) => {
    const { employee_id, file_name, type } = data;
    try {
      if (!employee_id || !file_name || !type)
        throw new CustomError(
          "Faltan valores para insertar un documento del empleado",
          400
        );

      const [document] = await db.query(
        "INSERT INTO documents (employee_id, file_name, type, created_by, created_at) VALUES (?, ?, ?, ?, NOW());",
        [employee_id, file_name, type, created_by]
      );

      if (!document.affectedRows)
        throw new CustomError(
          "Error al insertar el documento del empleado",
          400
        );

      return { msg: "Documento creado exitosamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al ingresar el documento del empleado",
        500
      );
    }
  },

  getDocumentsByEmployeeId: async (employee_id) => {
    try {
      if (!employee_id) throw new CustomError("Falta el id del empleado", 400);

      const [list] = await db.query(
        "SELECT * FROM documents WHERE employee_id = ?",
        [employee_id]
      );

      if (!list.length)
        throw new CustomError(
          "No se encontraron documentos de este empleado",
          404
        );

      return list;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los documentos del empleado",
        500
      );
    }
  },

  updateDocument: async (data) => {
    const { id, file_name, type } = data;
    try {
      if (!id || !file_name || !type)
        throw new CustomError(
          "Faltan valores para actualizar el documento",
          400
        );

      const [document] = await db.query(
        "UPDATE documents SET file_name = ?, type = ? WHERE id = ?;",
        [file_name, type, id]
      );

      if (!document.affectedRows)
        throw new CustomError(
          "Error al actualizar el documento del empleado",
          400
        );

      return { msg: "Documento actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el documento del empleado",
        500
      );
    }
  },

  insertContract: async (name) => {
    try {
      if (!name) throw new CustomError("Falta el nombre del contrato", 400);

      const [contract] = await db.query(
        "INSERT INTO contracts (name) VALUES (?);",
        [name]
      );

      if (!contract.affectedRows)
        throw new CustomError("Error al ingresar contrato", 400);

      return { msg: "Contrato ingresado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al ingresar contrato", 500);
    }
  },

  getContracts: async () => {
    try {
      const [contracts] = await db.query("SELECT * FROM contracts;");

      if (!contracts.length)
        throw new CustomError("No se encontraron contratos", 404);

      return contracts;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener los contratos",
        500
      );
    }
  },

  updateContract: async (data) => {
    const { id, name } = data;
    try {
      if (!id || !name) throw new CustomError("Faltan datos del contrato", 400);

      const [contract] = await db.query(
        "UPDATE contracts SET name = ? WHERE id = ?;",
        [name, id]
      );

      if (!contract.affectedRows)
        throw new CustomError("Error al actualizar contrato", 400);

      return { msg: "Contrato actualizado correctamente", code: 200 };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError("Error en el servidor al actualizar contrato", 500);
    }
  },

  insertEmployeeContract: async (data) => {
    const { employee_id, contract_name, end_date } = data;
    try {
      if (!employee_id || !contract_name)
        throw new CustomError(
          "Faltan valores para el contrato del empleado",
          400
        );

      const [emp_contract] = await db.query(
        "INSERT INTO employee_contracts (employee_id, contract_name, end_date) VALUES (?, ?, ?);",
        [employee_id, contract_name, end_date]
      );

      if (!emp_contract.affectedRows)
        throw new CustomError(
          "Error al ingresar el contrato del empleado",
          400
        );

      return {
        msg: "Contrato del empleado ingresado correctamente",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al ingresar contrato del empleado",
        500
      );
    }
  },

  getEmployeeContractsByEmployeeId: async (employee_id) => {
    try {
      if (!employee_id) throw new CustomError("Falta el id del empleado", 400);
      const [contract] = await db.query(
        "SELECT * FROM employee_contracts WHERE employee_id = ?;",
        [employee_id]
      );

      if (!contract.length)
        throw new CustomError("Error al obtener el contrato del empleado", 400);

      return contract;
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al obtener contrato del empleado",
        500
      );
    }
  },

  updateEmployeeContract: async (data) => {
    const { id, contract_name, end_date } = data;
    try {
      if (!id || !contract_name || !end_date)
        throw new CustomError(
          "Faltan valores para actualizar el contrato del empleado",
          400
        );

      const [emp_contract] = await db.query(
        "UPDATE employee_contracts SET contract_name = ?, end_date = ? WHERE id = ?;",
        [contract_name, end_date, id]
      );

      if (!emp_contract.affectedRows)
        throw new CustomError(
          "Error al actualizar el contrato del empleado",
          400
        );

      return {
        msg: "Contrato del empleado actualizado correctamente",
        code: 200,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Error en el servidor al actualizar el contrato del empleado",
        500
      );
    }
  },
};
