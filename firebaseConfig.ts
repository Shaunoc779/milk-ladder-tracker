// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB6PYO20HNuEeiqppwVJV0L7yLOagZnq4",
  authDomain: "milk-ladder-tracker-94808.firebaseapp.com",
  projectId: "milk-ladder-tracker-94808",
  storageBucket: "milk-ladder-tracker-94808.firebasestorage.app",
  messagingSenderId: "957453947333",
  appId: "1:957453947333:web:38b9a7f655aef8c0bdfbac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;