import { Router } from "express";
import { appointmentRouter } from "./appointment.router";
import { appointmentSlotRouter } from "./appointment_slot.router";
import { appointmentTypeRouter } from "./appointment_type.router";
import { availabilityRouter } from "./availability.router";
import { patientRouter } from "./patient.router";
import { practitionerRouter } from "./practitioner.router";

const mainRouter = Router();

mainRouter.get("/", (_req, res) => {
  res.send("Server online");
});
mainRouter.use(appointmentRouter);
mainRouter.use(appointmentSlotRouter);
mainRouter.use(appointmentTypeRouter);
mainRouter.use(availabilityRouter);
mainRouter.use(patientRouter);
mainRouter.use(practitionerRouter);

export { mainRouter };
