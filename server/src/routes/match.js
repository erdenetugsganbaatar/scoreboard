import { Router } from 'express';
import * as matchController from "../controllers/match/match.controller"
import * as matchValidator from "../controllers/match/match.validator"

import { validate } from 'express-validation';

const router = Router();

router.post("/start", validate(matchValidator.startMatch), matchController.startMatch)

router.post("/addScoreToTeam", validate(matchValidator.addScoreToTeam), matchController.addScoreToTeam)


router.get("/:id", matchController.getMatchByID)


module.exports = router;
