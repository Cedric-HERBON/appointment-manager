import { Router } from "express";
import { appointmentTypeController } from "../controllers/appointment_type.controller";

const appointmentTypeRouter = Router();

appointmentTypeRouter.get('/appointment-types', appointmentTypeController.getAllAppointmentTypes);
appointmentTypeRouter.get('/appointment-type/by-type', appointmentTypeController.getAppointmentTypeByIdAppointmentType);
appointmentTypeRouter.get('/appointment-type/by-practitionner', appointmentTypeController.getAppointmentTypeByIdPractitioner);
appointmentTypeRouter.get('/appointment-type/by-both-id', appointmentTypeController.getAppointmentTypeByIdAppointmentTypeAndIdPractitioner);
appointmentTypeRouter.post('/appointment-type', appointmentTypeController.createAppointmentType);
appointmentTypeRouter.patch('/appointment-type', appointmentTypeController.updateAppointmentType);
appointmentTypeRouter.delete('/appointment-type', appointmentTypeController.deleteAppointmentType);

export { appointmentTypeRouter };
