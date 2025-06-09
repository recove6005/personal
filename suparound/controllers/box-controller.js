import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { store } from "./config/firebase-config.js";
import { Timestamp } from 'firebase-admin/firestore';

export const save = async (req, res) => {
    const { title, content, date } = req.body;
    if(!title, !content, !date) {
        console.log('No args');
        return res.sendStatus(401);
    }

    try {
        const time = Timestamp.now();
        const docRef = store.collection('box-journal');
        
        const snap = await docRef.add(
            {
                'title': title,
                'content': content,
                'createdAt': time,
                'date': date,
                'docId': '',
            }
        );
        
        await snap.update({
            'docId': snap.id
        });

        return res.sendStatus(200);
    } catch(e) {
        console.log(`Failed to save journal - ${e}`);
        return res.sendStatus(500);
    }
}

export const load = async (req, res) => {
    try {
        const journals = [];
        const snap = await store.collection('box-journal').orderBy('createdAt', 'desc').get();
        
        for(var doc of snap.docs) {
            journals.push(doc.data());
        }

        return res.status(200).json({journals: journals});
    } catch(e) {
        console.log(`Failed to load box journals - ${e}`);
        return res.sendStatus(500);
    }
}

export const loadJournal = async (req, res) => {
    const { docId } = req.body;

    try {
        const snap = await store.collection('box-journal').doc(docId).get();
        return res.status(200).json({ journal: snap.data() });

    } catch(e) {
        console.log(`Failed to load one box journal - ${e}`);
        return res.sendStatus(500);
    }
}

