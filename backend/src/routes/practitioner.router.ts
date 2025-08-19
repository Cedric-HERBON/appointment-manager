import { Router } from "express";
import { practitionerController } from "../controllers/practitioner.controller";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper";
import { validateSchema } from "../middlewares/validateZod";
import { PractitionerSchema } from "../schemas/practitioner.schema";

const practitionerRouter = Router();
practitionerRouter.get("/practitioners", cw(practitionerController.getAllPractitioners));
practitionerRouter.get("/practitioner/id_practitioner", cw(practitionerController.getPractitionerByIdPractitioner));
practitionerRouter.get("/login", validateSchema(PractitionerSchema), cw(practitionerController.getPractitionerByEmail));
practitionerRouter.post("/register", validateSchema(PractitionerSchema), cw(practitionerController.createPractitioner));
practitionerRouter.patch("/practitioner", validateSchema(PractitionerSchema), cw(practitionerController.updatePractitioner));
practitionerRouter.delete("/practitioner", cw(practitionerController.deletePractitioner));

export { practitionerRouter };
