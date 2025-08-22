// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUtynkrfOuO4stgPPxIzhEJRwUHi_bNTY",
  authDomain: "sola-fi.firebaseapp.com",
  projectId: "sola-fi",
  storageBucket: "sola-fi.appspot.com",
  messagingSenderId: "988140942037",
  appId: "1:988140942037:web:78d83436b903650a2ba85c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
