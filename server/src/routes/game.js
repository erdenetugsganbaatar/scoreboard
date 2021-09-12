import { Router } from 'express';

const router = Router();

router.route("/start")
    .post((req,res) => {        
        res.send(req.body);
    })

module.exports = router;
