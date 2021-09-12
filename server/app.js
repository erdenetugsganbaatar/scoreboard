import express from "express";
import cors from "cors";

import teamsRouter from "./src/routes/teams";
import gameRouter from "./src/routes/game";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/teams", teamsRouter);
app.use("/", gameRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));