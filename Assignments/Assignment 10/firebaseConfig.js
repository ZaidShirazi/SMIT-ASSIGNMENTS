// Import the functions I need from the SDKs I need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

import {
  deleteDoc,
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that I want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDePCmGlIIO44Ra9U3JynL9QYcVMd5y4Ds",
  authDomain: "learning-db-61519.firebaseapp.com",
  projectId: "learning-db-61519",
  storageBucket: "learning-db-61519.firebasestorage.app",
  messagingSenderId: "458264409328",
  appId: "1:458264409328:web:120fee15577ecf1fbabe35",
  measurementId: "G-KNQVMPR037",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
  deleteDoc,
  doc,
  setDoc,
  addDoc,
  collection,
  db,
  getDocs,
  auth,
  createUserWithEmailAndPassword,
};
