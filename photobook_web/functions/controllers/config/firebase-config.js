import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAkOPTaZ2oFEkG39A8iC0AhsXKH4M_kLQ",
  authDomain: "photobook-e1192.firebaseapp.com",
  projectId: "photobook-e1192",
  storageBucket: "photobook-e1192.firebasestorage.app",
  messagingSenderId: "1060608573486",
  appId: "1:1060608573486:web:a200ab96616340031cdfbf",
  measurementId: "G-0CX4WPVSFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };