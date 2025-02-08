import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence} from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userColRef = collection(db, 'users');
const trashcanColRef = collection(db, 'trashcans');
const hotspotColRef = collection(db, 'hotspots');


getDocs(userColRef).then((querySnapshot) => {
  let users = []
  snapshot.getDocs(querySnapshot).forEach((doc) => {
    users.push({...doc.data(), id: doc.id});
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });


});

getDocs(trashcanColRef).then((querySnapshot) => {
  let trashcans = []
  snapshot.getDocs(querySnapshot).forEach((doc) => {
    trashcans.push({...doc.data(), id: doc.id});
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
});

getDocs(hotspotColRef).then((querySnapshot) => {
  let hotspots = []
  snapshot.getDocs(querySnapshot).forEach((doc) => {
    hotspots.push({...doc.data(), id: doc.id});
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
});

const storage = getStorage(app);

//const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)

})
//const q = query(userColRef, where("Name", "==", "Alice"));

//const addUserForm = document.querySelector('.add')
//addUserForm.addEventListener('submit', (e) => {
 // e.preventDefault(userColRef, {
 //   Name : addUserForm.name.value,
 // });
//});

//const deleteUserForm = document.querySelector('.delete') 
//deleteUserForm.addEventListener('submit', (e) => {
 // e.preventDefault();
//});

onSnapshot(userColRef, (snapshot) => {
  let users = [];
  snapshot.docs.forEach(doc => {
    users.push({...doc.data(), id: doc.id});
  });
});

onSnapshot(trashcanColRef, (snapshot) => {
  let trashcans = [];
  snapshot.docs.forEach(doc => {
    trashcans.push({...doc.data(), id: doc.id});
  });
});

onSnapshot(hotspotColRef, (snapshot) => {
  let hotspots = [];
  snapshot.docs.forEach(doc => {
    hotspots.push({...doc.data(), id: doc.id});
  });
});



export { app, db, auth, storage, hotspotColRef, trashcanColRef, userColRef};