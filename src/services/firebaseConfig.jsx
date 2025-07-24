// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnReFV6JDcTvEwyfLaq2J6ub4vkQz6lgs",
  authDomain: "predictive-72068.firebaseapp.com",
  projectId: "predictive-72068",
  storageBucket: "predictive-72068.firebasestorage.app",
  messagingSenderId: "279599351134",
  appId: "1:279599351134:web:4f2cfb6b9fe226b1c2bbcf",
  measurementId: "G-80F0C3R682"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);