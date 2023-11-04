// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);

export const savePassword = (site, username, password)=> {
   
    console.log(site, username, password)

}
