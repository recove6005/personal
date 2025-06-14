import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { store } from "./config/firebase-config.js";

import dotenv from 'dotenv';
dotenv.config();

export const gatePass = async (req, res) => {
    const { password } = req.body;
    try {
        const storeHashSnap = await store.collection('pass').doc('gate').get();
        const storeHashed = storeHashSnap.data().key;

        const isMatch = await bcrypt.compare(password, storeHashed);
        
        if(isMatch) {
            const payload = { role: 'gate' };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.cookie('gate-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 3600000,
            });

            return res.sendStatus(200);
        } else {
            console.log(`Match Error.`);
            return res.sendStatus(500);
        }

    } catch(e) {
        console.log(`Failed to pass web gate - ${e}`);
    }
}

export const authCheck = async (req, res) => {
    return res.sendStatus(200);
}

export const getBcryptHash = async (req, res) => {
    const { plain } = req.body;
    var hashed = '';
    try {
        if(plain === 'boxoffice') {
            hashed = await bcrypt.hash('lees-movie', 12);
        }
        else if(plain === 'box') {
            hashed = await bcrypt.hash('lees-ex-journal', 12);
        }
        return res.status(200).json({ hashed: hashed });
    } catch(e) {
        console.log(`Failed to get hashed - ${e}`);
        return res.sendStatus(500);
    }
    
}

export const load = async (req, res) => {
    const { type } = req.body;

    if(await bcrypt.compare('lees-movie' , type)) {
        return res.redirect(200, '/public/tempate/boxoffice.html');
    }
    if(await bcrypt.compare('lees-ex-journal', type)) {
        return res.redirect(200, '/public/template/box.html');
    }
    else {
        return res.sendStatus(500);
    }
}

