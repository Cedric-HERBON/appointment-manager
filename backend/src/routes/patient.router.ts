import { Router } from "express";
import { patientController } from "../controllers/patient.controller";

const patientRouter = Router();
patientRouter.get("/patients", patientController.getAllPatients);
patientRouter.get("/patient/id_patient", patientController.getPatientByIdPatient);
patientRouter.get("/login", patientController.getPatientByEmail);
patientRouter.post("/register", patientController.createPatient);
patientRouter.patch("/patient", patientController.updatePatient);
patientRouter.delete("/patient", patientController.deletePatient);

export { patientRouter };
