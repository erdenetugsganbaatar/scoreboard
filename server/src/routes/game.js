import { Router } from 'express';

const router = Router();

router.route("/start")
    .post((req,res) => {        
        res.send({message:"Hi!"});
    })

module.exports = router;
