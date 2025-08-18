import { Router } from "express";
import { practitionerController } from "../controllers/practitioner.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";

const practitionerRouter = Router();
practitionerRouter.get("/practitioners", cw(practitionerController.getAllPractitioners));
practitionerRouter.get("/practitioner/id_practitioner", cw(practitionerController.getPractitionerByIdPractitioner));
practitionerRouter.get("/login", cw(practitionerController.getPractitionerByEmail));
practitionerRouter.post("/register", cw(practitionerController.createPractitioner));
practitionerRouter.patch("/practitioner", cw(practitionerController.updatePractitioner));
practitionerRouter.delete("/practitioner", cw(practitionerController.deletePractitioner));

export { practitionerRouter };
