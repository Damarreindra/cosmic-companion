import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ7Mw-TaVoJI1m1YDHxJZl6eygfBGVJSA",
  authDomain: "cosmic-companion-f92c9.firebaseapp.com",
  projectId: "cosmic-companion-f92c9",
  storageBucket: "cosmic-companion-f92c9.firebasestorage.app",
  messagingSenderId: "613257330390",
  appId: "1:613257330390:web:b9a103acb134e81ba39377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
