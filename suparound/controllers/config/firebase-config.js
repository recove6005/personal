import admin from "firebase-admin";
import serviceAccount from "../../adminsdk-fbsvc.json" assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'suparound-korea.firebasestorage.app',
});

const store = admin.firestore();
// const bucket = admin.storage().bucket();

export { store };