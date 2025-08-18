import { Router } from "express";
import { appointmentController } from "../controllers/appointment.controller";

const appointmentRouter = Router();

appointmentRouter.get("/appointments", appointmentController.getAllAppointments);
appointmentRouter.get("/appointment/by-appointment", appointmentController.getAppointmentByIdAppointment);
appointmentRouter.get("/appointment/by-patient", appointmentController.getAppointmentByIdPatient);
appointmentRouter.post("/appointment", appointmentController.createAppointment);
appointmentRouter.patch("/appointment", appointmentController.updateAppointment);
appointmentRouter.delete("/appointment", appointmentController.deleteAppointment);

export { appointmentRouter };
