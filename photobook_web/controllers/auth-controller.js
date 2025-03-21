import path from 'path';
import { fileURLToPath } from 'url';
import { db, auth, storage } from "./config/firebase-config.js";
import { collection, getDoc, query, addDoc, getDocs, doc } from "firebase/firestore";

const __filenmae = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae);

export const validateSecretEntry = async (req, res) => { 
    const { key } = req.body;

    try {
        const entryRef = doc(collection(db, 'secret'), 'secret');
        const snap = await getDoc(entryRef);
    
        if(!snap.exists()) {
            return res.sendStatus(404);
        }
    
        if(snap.data().key === key) {
            return res.redirect(`/intro/home.html?secret=${key}`);
        } 
    } catch(e) {
        console.log(e.message);
    }
    
    return res.sendStatus(401);
}

export const validateSecretMain = async (req, res) => {
    const { key } = req.body;

    const entryRef = doc(collection(db, 'secret'), 'secret');
    const snap = await getDoc(entryRef);

    if(!snap.exists) {
        return res.sendStatus(404);
    }

    if(snap.data().key === key) {
        return res.sendStatus(200);
    } 
    
    return res.sendStatus(401);

}