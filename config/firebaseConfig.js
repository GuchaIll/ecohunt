import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDrW72MyJ6eOUV9g2d1ztW5wzu1aPfyrjk",
  authDomain: "ecohunt-fcc9c.firebaseapp.com",
  projectId: "ecohunt-fcc9c",
  storageBucket: "ecohunt-fcc9c.appspot.com",
  messagingSenderId: "16987863967",
  appId: "1:16987863967:web:b078b52368b92c812c5baa",
  measurementId: "G-S3TDYX0YW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const result = await signInWithPopup(auth, provider);
const storage = getStorage(app);

export { app, db, auth, storage };