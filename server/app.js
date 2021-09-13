import express from "express";
import cors from "cors";

import errorHandler  from "./src/middleware/errorHandler";

import team from "./src/routes/team";
import matchRouter from "./src/routes/match";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/team", team);
app.use("/match", matchRouter);
app.use(errorHandler)

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));