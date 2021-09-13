import { doc, getDoc, updateDoc, addDoc, getFirestore, collection, increment } from "firebase/firestore";
import { successResponse, errorResponse } from "../../helpers";
import firebase from "../../db/firebase";

const db = getFirestore(firebase);

export const startMatch = async (req, res) => {
    try {
        const { teams: { East, West }, matchDuration } = req.body;
        const docRef = await addDoc(collection(db, "matches"), {
            teams: {
                East: {
                    id: East,
                    score: 0
                },
                West: {
                    id: West,
                    score: 0
                },
            }, startedAt: new Date().getTime(),
            isEnded: false,
            matchDuration,
        })
        successResponse(req, res, { matchID: docRef.id }, 200);
    }
    catch (e) {
        errorResponse(req, res, e.message, e.statusCode, e);
    }
}
const getMatchDataByID = async (id) => {
    const docRef = doc(db, "matches", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return {}
    }
}

export const getMatchByID = async (req, res) => {
    try {
        const matchData = getMatchDataByID(req.params.id);
        return successResponse(req, res, matchData, 200);
    }
    catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}

export const addScoreToTeam = async (req, res) => {
    try {
        const { matchID, conference, score } = req.body;
        const MatchSnap = await getMatchDataByID(matchID);
        const updatedMatchSnap = { ...MatchSnap };
        console.log(updatedMatchSnap)
        updatedMatchSnap.teams[conference].score += score;
        await updateDoc(doc(db, "matches", matchID), updatedMatchSnap)
        successResponse(req, res, { data: updatedMatchSnap }, 200);

    } catch (e) {
        errorResponse(req, res, e.message, e.statusCode, e);
    }
}