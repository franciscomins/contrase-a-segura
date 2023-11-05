// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore,
         collection,
         addDoc,
         getDocs,
         onSnapshot,
         deleteDoc,
         doc,
         getDoc,
         updateDoc,
   } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoD5garQlj6AIVO2aZY5wgC4czavX3WOk",
  authDomain: "password-734ec.firebaseapp.com",
  projectId: "password-734ec",
  storageBucket: "password-734ec.appspot.com",
  messagingSenderId: "171578592642",
  appId: "1:171578592642:web:870603cecd5edd4cf5139b",
  measurementId: "G-PZVQY4GRY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const savePassword = (site, username, password) =>
  addDoc(collection(db, "passwords"), { site, username, password });

export const getPass = () => getDocs(collection(db,'passwords'))

export const onGetPass = (callback) => onSnapshot(collection(db,'passwords'),callback)

export const deletePass = id => deleteDoc(doc(db, 'passwords', id))

export const editPass = id => getDoc(doc(db, 'passwords', id))

export const updatePass = (id, newFields) =>
 updateDoc(doc(db, 'passwords',id), newFields);

