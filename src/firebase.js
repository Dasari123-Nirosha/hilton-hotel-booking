
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoNQLiFuaNrJ96bHy5cBxlWF51FcKIwa8",
  authDomain: "hilton-hotel-booking.firebaseapp.com",
  projectId: "hilton-hotel-booking",
  storageBucket: "hilton-hotel-booking.firebasestorage.app",
  messagingSenderId: "738187950799",
  appId: "1:738187950799:web:42356785e3dfe7b70495ba"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;