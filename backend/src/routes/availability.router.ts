import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const availabilityRouter = Router();
availabilityRouter.get("/availabilities", cw(availabilityController.getAllAvailabilities));
availabilityRouter.get("/availability/id_availability", cw(availabilityController.getByIdAvailability));
availabilityRouter.get("/availability/id_practitioner", cw(availabilityController.getByIdPractitioner));
availabilityRouter.post("/availability", cw(availabilityController.createAvailability));
availabilityRouter.patch("/availability", cw(availabilityController.updateAvailability));
availabilityRouter.delete("/availability", cw(availabilityController.deleteAvailability));

export { availabilityRouter };
