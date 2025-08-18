import { Router } from "express";
import { patientController } from "../controllers/patient.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const patientRouter = Router();
patientRouter.get("/patients", cw(patientController.getAllPatients));
patientRouter.get("/patient/id_patient", cw(patientController.getPatientByIdPatient));
patientRouter.get("/login", cw(patientController.getPatientByEmail));
patientRouter.post("/register", cw(patientController.createPatient));
patientRouter.patch("/patient", cw(patientController.updatePatient));
patientRouter.delete("/patient", cw(patientController.deletePatient));

export { patientRouter };
