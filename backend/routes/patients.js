import { Router } from "express";
import { addPatient } from "../controllers/patientController.js";

const patientRouter = Router();

patientRouter.post("/create", addPatient);

export default patientRouter;