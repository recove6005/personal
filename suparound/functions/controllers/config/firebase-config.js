import admin from "firebase-admin";
import { readFileSync } from 'fs';
const serviceAccount = JSON.parse(readFileSync(new URL('../../adminsdk-fbsvc.json', import.meta.url)));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'suparound-korea.firebasestorage.app',
});

const store = admin.firestore();
// const bucket = admin.storage().bucket();

export { store };