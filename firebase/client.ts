// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAygHDSL97tQmJDLvV_8rhWbfIAeBcGez8",
  authDomain: "prepwise-5c05c.firebaseapp.com",
  projectId: "prepwise-5c05c",
  storageBucket: "prepwise-5c05c.firebasestorage.app",
  messagingSenderId: "298023035868",
  appId: "1:298023035868:web:b328f92e76f025e5232519",
  measurementId: "G-F24RVS4TTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);