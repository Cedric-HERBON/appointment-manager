import { Router } from "express";
import { appointmentTypeController } from "../controllers/appointment_type.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const appointmentTypeRouter = Router();

appointmentTypeRouter.get("/appointment-types", cw(appointmentTypeController.getAllAppointmentTypes));
appointmentTypeRouter.get("/appointment-type/by-type", cw(appointmentTypeController.getAppointmentTypeByIdAppointmentType));
appointmentTypeRouter.get("/appointment-type/by-practitioner", cw(appointmentTypeController.getAppointmentTypeByIdPractitioner));
appointmentTypeRouter.get("/appointment-type/by-both-id", cw(appointmentTypeController.getAppointmentTypeByIdAppointmentTypeAndIdPractitioner));
appointmentTypeRouter.post("/appointment-type", cw(appointmentTypeController.createAppointmentType));
appointmentTypeRouter.patch("/appointment-type", cw(appointmentTypeController.updateAppointmentType));
appointmentTypeRouter.delete("/appointment-type", cw(appointmentTypeController.deleteAppointmentType));

export { appointmentTypeRouter };
