// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-96c30.firebaseapp.com",
  projectId: "real-estate-96c30",
  storageBucket: "real-estate-96c30.appspot.com",
  messagingSenderId: "517276356921",
  appId: "1:517276356921:web:e3c745c3ba7f2d499798e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);