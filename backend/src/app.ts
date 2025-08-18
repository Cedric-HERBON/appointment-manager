import express from "express";
import { sanitizeBody } from "./middlewares/sanitizeHtml";
import { mainRouter } from "./routes/main.router";


const app = express();
app.use(express.json());

app.use(sanitizeBody);
app.use(mainRouter);

export { app };
