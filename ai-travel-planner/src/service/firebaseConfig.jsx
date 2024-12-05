// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtfCxgd_gjf5jOJoipy3HoVIE6AwSzQc8",
  authDomain: "ai-trip-planner11.firebaseapp.com",
  projectId: "ai-trip-planner11",
  storageBucket: "ai-trip-planner11.firebasestorage.app",
  messagingSenderId: "996385482206",
  appId: "1:996385482206:web:c26396c74fac3195d8694f",
  measurementId: "G-WBGZ3DNT0Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
