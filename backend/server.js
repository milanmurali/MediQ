import express from "express";
import 'dotenv/config'
import cors from "cors";

import "./database/db.js";
import patientRouter from "./routes/patients.js";

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use("/api/patients", patientRouter)

app.listen(PORT, () => {
    console.log(`Backend Server Running on http://127.0.0.1:${PORT}`);
})