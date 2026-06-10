import { Router } from "express";
import { addPatient, getPatients } from "../controllers/patientController.js";

const patientRouter = Router();

patientRouter.post("/", addPatient);
patientRouter.get("/", getPatients);



export default patientRouter;