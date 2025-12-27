import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDPvU78DJ_O04B3JEZ5EQPdRqhSO589m4",
  authDomain: "bitunsaid-5dd27.firebaseapp.com",
  projectId: "bitunsaid-5dd27",
  storageBucket: "bitunsaid-5dd27.firebasestorage.app",
  messagingSenderId: "267532532764",
  appId: "1:267532532764:web:1b9fe30ed4449c0490b3d9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
