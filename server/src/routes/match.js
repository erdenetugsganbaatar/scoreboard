import { Router } from 'express';
import { startMatch } from '../controllers/match/match.controller';
const router = Router();

router.route("/start")
    .post(startMatch)

module.exports = router;
