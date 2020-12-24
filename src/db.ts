/**
 * Export the db instance to use to update the cloud
 */
import firebase from 'firebase/app'
import 'firebase/firestore'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAeshzXb8oyIiRa2hkEJA8ky1wa3S0i0xw",
    authDomain: "doit-aa6f0.firebaseapp.com",
    projectId: "doit-aa6f0",
    storageBucket: "doit-aa6f0.appspot.com",
    messagingSenderId: "798348044749",
    appId: "1:798348044749:web:bfe4a9347b4a27251f3c84"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();