import express from "express";
import cors from "cors";

import teamsRouter from "./src/routes/teams";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/teams", teamsRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));