import { Router } from "express";
import { appointmentController } from "../controllers/appointment.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const appointmentRouter = Router();

appointmentRouter.get("/appointments", cw(appointmentController.getAllAppointments));
appointmentRouter.get("/appointment/by-appointment", cw(appointmentController.getAppointmentByIdAppointment));
appointmentRouter.get("/appointment/by-patient", cw(appointmentController.getAppointmentByIdPatient));
appointmentRouter.post("/appointment", cw(appointmentController.createAppointment));
appointmentRouter.patch("/appointment", cw(appointmentController.updateAppointment));
appointmentRouter.delete("/appointment", cw(appointmentController.deleteAppointment));

export { appointmentRouter };
