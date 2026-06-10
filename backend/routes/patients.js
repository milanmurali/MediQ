import { Router } from "express";
import { addPatient, getPatients, getPatientsById } from "../controllers/patientController.js";

const patientRouter = Router();

patientRouter.post("/", addPatient);
patientRouter.get("/:id", getPatientsById);
patientRouter.get("/", getPatients);



export default patientRouter;