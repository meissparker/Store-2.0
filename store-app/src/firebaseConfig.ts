import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCCMRvm8CqYHXrg3WX2xC15oZEamEIAiHo",
    authDomain: "e-commerce-app-d821d.firebaseapp.com",
    projectId: "e-commerce-app-d821d",
    storageBucket: "e-commerce-app-d821d.firebasestorage.app",
    messagingSenderId: "804079842742",
    appId: "1:804079842742:web:8f708f768b870c8d343d17"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
