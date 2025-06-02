import admin from "firebase-admin";
import serviceAccount from "../../suparound-app-firebase-adminsdk-fbsvc-a07493045e" assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'suparound-korea.firebasestorage.app',
});

const db = admin.firestore();
// const bucket = admin.storage().bucket();

export { db };