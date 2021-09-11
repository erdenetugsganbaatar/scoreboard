import { Router } from 'express';
import fs from "fs";
import path from "path";

const router = Router();

router.route("/")
    .get((req,res) => {        
        const file = fs.readFileSync(path.resolve(__dirname,"../../data/teams.json"));
        const data = JSON.parse(file);
        res.send(data);
    })

module.exports = router;
