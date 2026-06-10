import db from "../database/db.js";
import { DEP_CODES } from "../utils/departmentCodes.js";

export const generateToken = (department) => {
  const deptCode = DEP_CODES[department];

  if (!deptCode) {
    throw new Error("Invalid department");
  }

  const latestPatient = db
    .prepare(`
      SELECT token
      FROM patients
      WHERE department = ?
      AND DATE(created_at) = DATE('now')
      ORDER BY id DESC
      LIMIT 1
    `)
    .get(department);

  let nextNumber = 1;

  if (latestPatient) {
    const currentNumber = Number(
      latestPatient.token.split("-")[1]
    );

    nextNumber = currentNumber + 1;
  }

  return `${deptCode}-${String(nextNumber).padStart(3, "0")}`;
};