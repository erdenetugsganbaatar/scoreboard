import { doc, setDoc } from "firebase/firestore"; 

export const startMatch = (req, res) => {
    try {
        // const { teams: { east, west }, time } = req.body;
        const { matchData } = req.body;
        
        res.send({ message: "Soon I'll come back to you :)" });
    }
    catch (e) {
        res.status(400).send(e.message);
    }
}
