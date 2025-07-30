import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("Server online");
});

export { mainRouter };
