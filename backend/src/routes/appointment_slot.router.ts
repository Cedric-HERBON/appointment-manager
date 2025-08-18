import { Router } from "express";
import { appointmentSlotController } from "../controllers/appointment_slot.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const appointmentSlotRouter = Router();

appointmentSlotRouter.get("/appointment-slots", cw(appointmentSlotController.getAllAppointmentSlots));
appointmentSlotRouter.get("/appointment-slot/by-slot", cw(appointmentSlotController.getByIdAppointmentSlot));
appointmentSlotRouter.get("/appointment-slot/by-practitionner", cw(appointmentSlotController.getAllByIdPractitioner));
appointmentSlotRouter.post("/appointment-slot", cw(appointmentSlotController.createAppointmentSlot));
appointmentSlotRouter.patch("/appointment-slot", cw(appointmentSlotController.updateAppointmentSlot));
appointmentSlotRouter.delete("/appointment-slot", cw(appointmentSlotController.deleteAppointmentSlot));

export { appointmentSlotRouter };
