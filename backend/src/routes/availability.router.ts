import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller";

const availabilityRouter = Router();
availabilityRouter.get("/availabilities", availabilityController.getAllAvailabilities);
availabilityRouter.get("/availabilities/id_availability", availabilityController.getByIdAvailability);
availabilityRouter.get("/availabilities/id_practitioner", availabilityController.getByIdPractitioner);
availabilityRouter.post("/availabilities", availabilityController.createAvailability);
availabilityRouter.patch("/availabilities", availabilityController.updateAvailability);
availabilityRouter.delete("/availabilities", availabilityController.deleteAvailability);

export { availabilityRouter };
