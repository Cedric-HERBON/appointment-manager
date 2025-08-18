import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const availabilityRouter = Router();
availabilityRouter.get("/availabilities", cw(availabilityController.getAllAvailabilities));
availabilityRouter.get("/availabilities/id_availability", cw(availabilityController.getByIdAvailability));
availabilityRouter.get("/availabilities/id_practitioner", cw(availabilityController.getByIdPractitioner));
availabilityRouter.post("/availabilities", cw(availabilityController.createAvailability));
availabilityRouter.patch("/availabilities", cw(availabilityController.updateAvailability));
availabilityRouter.delete("/availabilities", cw(availabilityController.deleteAvailability));

export { availabilityRouter };
