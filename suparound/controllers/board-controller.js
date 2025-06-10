import jwt from 'jsonwebtoken';
import { store } from "./config/firebase-config.js";

export const save = async (req, res) => {
    const { board } = req.body;

    try {
        const docRef = store.collection('board').doc('board');
        const snap = await docRef.set({
            'board': board,
        });

        return res.sendStatus(200);
    } catch(e) {
        console.log(`Failed to save board - ${e}`);
        return res.sendStatus(500);
    }
};

export const load = async (req, res) => {
    try {
        const snap = await store.collection('board').doc('board').get();
        return res.status(200).json({ board: snap.data() });
    } catch(e) {
        console.log(`Failed to load board - ${e}`);
        return res.sendStatus(500);
    }
}