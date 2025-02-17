import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdE_MDtHF7Mz0wd0lWzgMgUK0iKJ5lNgM",
  authDomain: "invoice-fa39f.firebaseapp.com",
  projectId: "invoice-fa39f",
  storageBucket: "invoice-fa39f.appspot.com",
  messagingSenderId: "391877262874",
  appId: "1:391877262874:web:55f3d1f3196576eac79ba3",
  measurementId: "G-DRRMPWCMXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
