// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9143-Au-pMAIEqF-pAPAQ8P_yf2kZe8U",
  authDomain: "newbase-5bbfd.firebaseapp.com",
  databaseURL:
    "https://newbase-5bbfd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "newbase-5bbfd",
  storageBucket: "newbase-5bbfd.firebasestorage.app",
  messagingSenderId: "711764310986",
  appId: "1:711764310986:web:ae2f98e6101c00ad602d33",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
