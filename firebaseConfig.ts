// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJWURjosfeyt3oYhASfBfHKGBgHCA-5s",
  authDomain: "commander-rhmg.firebaseapp.com",
  projectId: "commander-rhmg",
  storageBucket: "commander-rhmg.firebasestorage.app",
  messagingSenderId: "56927677945",
  appId: "1:56927677945:web:62b668a1787f1cde056128"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");