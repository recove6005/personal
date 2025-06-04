import admin from "firebase-admin";
import serviceAccount from "../../suparound-app-firebase-adminsdk-fbsvc-a07493045e.json" assert {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'suparound-korea.firebasestorage.app',
});

const store = admin.firestore();
// const bucket = admin.storage().bucket();

export { store };