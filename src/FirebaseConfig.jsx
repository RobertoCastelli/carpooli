// --- FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDFasT4-3_2rLXeVMc_nb5-rcLaHsUJJgQ",
  authDomain: "carpooli-85b72.firebaseapp.com",
  projectId: "carpooli-85b72",
  storageBucket: "carpooli-85b72.appspot.com",
  messagingSenderId: "876474565118",
  appId: "1:876474565118:web:f8393b2c6400a00f01c0af",
};

// --- Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
