import { successResponse, errorResponse } from "../../helpers";

import firebase from "../../db/firebase";
import { collection, getFirestore, doc, setDoc, getDocs, getDoc } from "firebase/firestore";


const db = getFirestore(firebase);

export const addTeam = async (req, res) => {
    try {
        const { id, abbr, city, conference, division, name } = req.body;
        const team = { id, abbr, city, conference, division, name };
        const result = await setDoc(doc(db, "teams", team.id), team);
        return successResponse(req, res, result, 200);
    } catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}
export const getAllTeam = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "teams"));
        const data = [];
        querySnapshot.forEach(doc => data.push(doc.data()))
        return successResponse(req, res, data, 200);
    }
    catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}
export const getTeamByID = async (req, res) => {
    try {
        const docRef = doc(db, "teams", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return successResponse(req, res, docSnap.data(), 200);
        } else {
            return successResponse(req, res, {}, 200);
        }
    }
    catch (e) {
        return errorResponse(req, res, e.message, e.statusCode, e)
    }
}
