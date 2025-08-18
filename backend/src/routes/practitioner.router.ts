import { Router } from "express";
import { practitionerController } from "../controllers/practitioner.controller";

const practitionerRouter = Router();
practitionerRouter.get("/practitioners", practitionerController.getAllPractitioners);
practitionerRouter.get("/practitioner/id_practitioner", practitionerController.getPractitionerByIdPractitioner);
practitionerRouter.get("/login", practitionerController.getPractitionerByEmail);
practitionerRouter.post("/register", practitionerController.createPractitioner);
practitionerRouter.patch("/practitioner", practitionerController.updatePractitioner);
practitionerRouter.delete("/practitioner", practitionerController.deletePractitioner);

export { practitionerRouter };
