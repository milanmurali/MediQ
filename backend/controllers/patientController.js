import { validatePatient } from "../utils/validation.js";
import { generateToken } from "../services/generateToken.js";
import db from "../database/db.js";




export const addPatient = (req, res) => {

    try {
        const { name, age, gender, mobile, address, department, } = req.body;

        const validationError = validatePatient(req.body);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const token = generateToken(department);

        const result = db
            .prepare(`
        INSERT INTO patients (
          name,
          age,
          gender,
          mobile,
          address,
          department,
          token
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
            .run(
                name,
                age,
                gender,
                mobile,
                address ?? null,
                department,
                token
            );

        const patient = db.prepare(`SELECT * FROM patients WHERE id = ?`).get(result.lastInsertRowid);

        return res.status(201).json({
            success: true,
            data: patient,
        });
    }

    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create patient",
        });
    }
};


export const getPatients = (req, res) => {
    try {
        const patients = db.prepare(`SELECT * FROM patients ORDER BY created_at DESC`).all();

        return res.status(200).json({
            success: true,
            data: patients,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch patients",
        });
    }
}

export const getPatientsById = (req, res) => {

    try {
        const { id } = req.params;
        const patient = db.prepare('SELECT * FROM patients WHERE id = ?').get(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: patient,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch patient",
        });
    }
}
