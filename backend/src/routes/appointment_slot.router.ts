import { Router } from "express";
import { appointmentSlotController } from "../controllers/appointment_slot.controller";

const appointmentSlotRouter = Router();

appointmentSlotRouter.get("/appointment-slots", appointmentSlotController.getAllAppointmentSlots);
appointmentSlotRouter.get("/appointment-slot/by-slot", appointmentSlotController.getByIdAppointmentSlot);
appointmentSlotRouter.get("/appointment-slot/by-practitionner", appointmentSlotController.getAllByIdPractitioner);
appointmentSlotRouter.post("/appointment-slot", appointmentSlotController.createAppointmentSlot);
appointmentSlotRouter.patch("/appointment-slot", appointmentSlotController.updateAppointmentSlot);
appointmentSlotRouter.delete("/appointment-slot", appointmentSlotController.deleteAppointmentSlot);

export { appointmentSlotRouter };
