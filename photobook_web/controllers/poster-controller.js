import path from 'path';
import { fileURLToPath } from 'url';
import { db, auth, storage } from "./config/firebase-config.js";
import { collection, doc, getDocs, orderBy, setDoc, getDoc, query, deleteDoc, where, updateDoc, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, getMetadata, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const __filenmae = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae);

export const addPoster = async (req, res) => {
    const { feeling, content } = req.body;
    const files = req.files || [];
    const uuid = uuidv4();

    try {
        const docRef = doc(collection(db, 'poster'));
        await addDoc(docRef, {
            docId: docRef.docId,
            content: content,
            feeling: feeling,
            uuid: uuid
        });

        if(files.length > 0) {
            try {
                const file = files[0];
                const fileName = docRef.id;
                const storageRef = ref(storage, fileName);
                await uploadBytes(storageRef, file.buffer);
            } catch(e) {
                console.log(e.message);
                return res.sendStatus(500);
            }   
        } 

        return res.sendStatus(200);
    } catch(e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}