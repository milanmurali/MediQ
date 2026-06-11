import express from "express";
import 'dotenv/config'
import cors from "cors";

import "./database/db.js";
import patientRouter from "./routes/patients.js";

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.use("/api/patients", patientRouter)


// health
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "MediQ Backend is running",
    });
});


app.listen(PORT, () => {
    console.log(`Backend Server Running on http://127.0.0.1:${PORT}`);
})