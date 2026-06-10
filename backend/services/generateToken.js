import db from "../database/db.js";
import { DEP_CODES } from "../utils/departmentCodes.js";

export const generateToken = (department) => {
  const deptCode = DEP_CODES[department];
  if (!deptCode) {
    throw new Error("Invalid department");
  }
};