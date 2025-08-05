import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (_req, res) => {
  res.send("Server online");
});

export { mainRouter };
