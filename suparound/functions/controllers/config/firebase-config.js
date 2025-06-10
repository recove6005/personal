import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./adminsdk-fbsvc.json', 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'suparound-korea.firebasestorage.app',
});

const store = admin.firestore();
// const bucket = admin.storage().bucket();

export { store };