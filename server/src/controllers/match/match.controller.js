import { doc, getDoc, updateDoc, addDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import { successResponse, errorResponse } from "../../helpers";
import firebase from "../../db/firebase";

const db = getFirestore(firebase);

export const startMatch = async (req, res) => {
    try {
        const { teams: { East, West }, matchDuration } = req.body;
        const dateNowInMil = new Date().getTime();
        const dateMatchWillEndInMil = dateNowInMil + (matchDuration * 1000);

        const data = {
            teams: {
                East: {
                    id: East,
                    score: 0
                },
                West: {
                    id: West,
                    score: 0
                },
            }, startedAt: dateNowInMil,
            endedAt: dateMatchWillEndInMil,
            matchDuration,
        }

        const docRef = await addDoc(collection(db, "matches"), data);

        // successResponse(req, res, { data }, 200);
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
        return null
    }
}

export const getMatchByID = async (req, res) => {
    try {
        const matchData = await getMatchDataByID(req.params.id);
        if (matchData) return successResponse(req, res, matchData, 200);
        return errorResponse(req, res, `match with id ${req.params.id} cannot be found!`, 404)
    }
    catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}

export const getAllMatches = async (req, res) => {
    try {
        const matchSnapShot = await getDocs(collection(db, "matches"));
        const teamSnapShot = await getDocs(collection(db, "teams"));
        const matchData = []
        const teamData = {}
        teamSnapShot.forEach(doc => {
            const teamDoc = doc.data();
            teamData[teamDoc.id] = teamDoc;
        })
        matchSnapShot.forEach((doc) => {
            const docData = JSON.parse(JSON.stringify(doc.data()));
            Object.keys(docData.teams).forEach(key => {
                    docData.teams[key] = {
                        ...docData.teams[key],
                        ...teamData[docData.teams[key].id]
                    }
                
            })
            matchData.push(docData);
        });
        return successResponse(req, res, matchData, 200);
    }
    catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}

export const addScoreToTeam = async (req, res) => {
    try {
        const { matchID, conference, score } = req.body;
        const matchSnap = await getMatchDataByID(matchID);
        if (matchSnap.endedAt <= new Date().getTime()) {
            return errorResponse(req, res, "Match has ended.", 400)
        }
        const updatedMatchSnap = { ...matchSnap };
        updatedMatchSnap.teams[conference].score += score;
        await updateDoc(doc(db, "matches", matchID), updatedMatchSnap)
        return successResponse(req, res, { ...updatedMatchSnap }, 200);
    } catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e);
    }
}