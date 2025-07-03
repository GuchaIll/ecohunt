import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot, updateDoc, getDoc, setDoc, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, initializeAuth, Auth, signInAnonymously } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDrW72MyJ6eOUV9g2d1ztW5wzu1aPfyrjk",
  authDomain: "ecohunt-fcc9c.firebaseapp.com",
  projectId: "ecohunt-fcc9c",
  storageBucket: "ecohunt-fcc9c.appspot.com",
  messagingSenderId: "16987863967",
  appId: "1:16987863967:web:b078b52368b92c812c5baa",
  measurementId: "G-S3TDYX0YW9"
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Initialize Auth with better error handling
let auth: Auth;
try {
  // First try to get existing auth instance
  auth = getAuth(app);
} catch (error) {
  console.log('Getting existing auth failed, initializing new auth...');
  try {
    auth = initializeAuth(app);
  } catch (initError) {
    console.log('Auth initialization error:', initError);
    // Fallback to getAuth if initializeAuth fails
    auth = getAuth(app);
  }
}

// Collection references (don't fetch data immediately)
const userColRef = collection(db, 'users');
const trashcanColRef = collection(db, 'trashcans');
const hotspotColRef = collection(db, 'hotspots');

// Token management functions
export const createUserDocument = async (userId: string, initialTokens: number = 1250): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        tokens: initialTokens,
        createdAt: new Date().toISOString(),
        // Add other default user fields here
      });
      console.log('User document created with initial tokens:', initialTokens);
    }
    return true;
  } catch (error) {
    console.error('Error creating user document:', error);
    return false;
  }
};

export const getUserTokens = async (userId?: string): Promise<number> => {
  try {
    if (!userId) {
      console.log('No user ID provided');
      return 0;
    }

    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.tokens || 0; // Return tokens or 0 if field doesn't exist
    } else {
      console.log('User document does not exist, creating one...');
      await createUserDocument(userId, 1250);
      return 1250; // Return initial tokens
    }
  } catch (error) {
    console.error('Error getting user tokens:', error);
    return 0;
  }
};

export const updateUserTokens = async (userId?: string, newTokenAmount: number = 0): Promise<boolean> => {
  try {
    if (!userId) {
      console.log('No user ID provided for token update');
      return false;
    }

    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      tokens: newTokenAmount,
      lastUpdated: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating user tokens:', error);
    return false;
  }
};

export const deductTokens = async (userId?: string, amount: number = 0): Promise<{ success: boolean; newTokens: number }> => {
  try {
    if (!userId) {
      console.log('No user ID provided for token deduction');
      return { success: false, newTokens: 0 };
    }

    const currentTokens = await getUserTokens(userId);
    
    if (currentTokens < amount) {
      return { success: false, newTokens: currentTokens };
    }
    
    const newTokens = currentTokens - amount;
    const updateSuccess = await updateUserTokens(userId, newTokens);
    
    return { success: updateSuccess, newTokens: updateSuccess ? newTokens : currentTokens };
  } catch (error) {
    console.error('Error deducting tokens:', error);
    return { success: false, newTokens: 0 };
  }
};

export const addTokens = async (userId?: string, amount: number = 0): Promise<{ success: boolean; newTokens: number }> => {
  try {
    if (!userId) {
      console.log('No user ID provided for adding tokens');
      return { success: false, newTokens: 0 };
    }

    const currentTokens = await getUserTokens(userId);
    const newTokens = currentTokens + amount;
    const updateSuccess = await updateUserTokens(userId, newTokens);
    
    return { success: updateSuccess, newTokens: updateSuccess ? newTokens : currentTokens };
  } catch (error) {
    console.error('Error adding tokens:', error);
    return { success: false, newTokens: 0 };
  }
};

export { app, db, auth, storage, hotspotColRef, trashcanColRef, userColRef};

// Authentication helper functions
export const signInAnonymousUser = async (): Promise<boolean> => {
  try {
    console.log('Attempting anonymous sign-in...');
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log('Anonymous user signed in:', user.uid);
    
    // Create user document if it doesn't exist (give anonymous users some starter tokens)
    await createUserDocument(user.uid, 1000);
    
    return true;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    return false;
  }
};