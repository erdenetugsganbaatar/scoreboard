import firebase from "../../db/firebase";

import { collection, getFirestore, doc, setDoc, getDocs, getDoc } from "firebase/firestore";

const db = getFirestore(firebase);

export const addTeam = async (req, res) => {
    const { id, abbr, city, conference, division, name } = req.body;
    const team = { id, abbr, city, conference, division, name };

    const result = await setDoc(doc(db, "teams", team.id), team);
    res.send(result);
}
export const getAllTeam = async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "teams"));
    const data = [];
    querySnapshot.forEach(doc => data.push(doc.data()))
    res.send(data);
}
export const getTeamByID = async (req, res) => {
    const docRef = doc(db, "teams", req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        res.send(docSnap.data());
    } else {
        res.send({})
    }
}
