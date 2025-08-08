import { Router } from "express";

import { appointmentTypeRouter } from "./appointment_type.router";

const mainRouter = Router();

mainRouter.get("/", (_req, res) => {
  res.send("Server online");
});
mainRouter.use(appointmentTypeRouter);

export { mainRouter };
