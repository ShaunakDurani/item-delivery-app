// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8zwohWLaa2qcPSJQvAHCUFoeUVM7Pico",
  authDomain: "netflixgpt-304bc.firebaseapp.com",
  projectId: "netflixgpt-304bc",
  storageBucket: "netflixgpt-304bc.firebasestorage.app",
  messagingSenderId: "1067046300170",
  appId: "1:1067046300170:web:ba2ebaaed1679c36a10df3",
  measurementId: "G-GKDW8G6C02",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
