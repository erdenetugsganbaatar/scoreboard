import { Router } from 'express';
import { validate, ValidationError } from 'express-validation';

import * as teamController from "../controllers/team/team.controller"
import * as teamValidator from "../controllers/team/team.validator"

const router = Router();


router.post("/", validate(teamValidator.addTeam), teamController.addTeam);
router.get("/all", teamController.getAllTeam);
router.get("/:id", teamController.getTeamByID);

module.exports = router;
