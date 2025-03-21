import path from 'path';
import { fileURLToPath } from 'url';
import { db, auth, storage } from "./config/firebase-config.js";
<<<<<<< HEAD
import { collection, getDoc, query, addDoc, getDocs } from "firebase/firestore";
=======
import { collection, doc, getDocs, orderBy, setDoc, getDoc, query, deleteDoc, where, updateDoc, addDoc } from "firebase/firestore";
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
import { ref, getDownloadURL, getMetadata, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const __filenmae = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae);

<<<<<<< HEAD
// 포스터 가져오기
export const getPoster = async (req, res) => {
    try {
        const q = query(collection(db, 'poster'));
        const snap = await getDocs(q);

        const posters = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return res.status(200).send(posters);

    } catch(e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

// 포스터 게시
=======
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
export const addPoster = async (req, res) => {
    const { feeling, content } = req.body;
    const files = req.files || [];
    const uuid = uuidv4();
<<<<<<< HEAD
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() +1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2,'0')}`;

    try {
        const docRef = await addDoc(collection(db, 'poster'), {
            content: content,
            feeling: feeling,
            date: formattedDate,
            uuid: uuid,
=======

    try {
        const docRef = doc(collection(db, 'poster'));
        await addDoc(docRef, {
            docId: docRef.docId,
            content: content,
            feeling: feeling,
            uuid: uuid
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
        });

        if(files.length > 0) {
            try {
                const file = files[0];
<<<<<<< HEAD
                const fileName = `posters/${uuid}`;
=======
                const fileName = docRef.id;
>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
                const storageRef = ref(storage, fileName);
                await uploadBytes(storageRef, file.buffer);
            } catch(e) {
                console.log(e.message);
                return res.sendStatus(500);
            }   
        } 
<<<<<<< HEAD
=======

>>>>>>> 1d98d6d537ad95be569ae0f623e68d2baf57c66b
        return res.sendStatus(200);
    } catch(e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}