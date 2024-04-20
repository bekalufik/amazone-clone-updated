import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgxbJ4zgpSzV8TvIvp9MiC5VVFdlZ9-vU",
    authDomain: "updated-clone.firebaseapp.com",
    projectId: "updated-clone",
    storageBucket: "updated-clone.appspot.com",
    messagingSenderId: "251901635255",
    appId: "1:251901635255:web:21eb3e2def3b3e68b87b32"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();