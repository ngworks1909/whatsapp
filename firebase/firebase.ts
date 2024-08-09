import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"



// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY || "",
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
//     databaseUrl: process.env.FIREBASE_DATABSE_URL || "",
//     projectId: process.env.FIREBASE_PROJECT_ID || "",
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET|| "",
//     messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID || "",
//     appId: process.env.FIREBASE_APP_ID || "",
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID || ""
// };

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || 'defaultapikey',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABSE_URL,
    projectId: `whatsapp-f7e8b`,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
