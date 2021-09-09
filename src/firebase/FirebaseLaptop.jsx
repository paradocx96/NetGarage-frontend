import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCE3xY6WbOFWXAb9DKDz63RPdXIOuzSZKc",
    authDomain: "netgarage-laptop.firebaseapp.com",
    databaseURL: "gs://netgarage-laptop.appspot.com",
    projectId: "netgarage-laptop",
    storageBucket: "netgarage-laptop.appspot.com",
    messagingSenderId: "988503060718",
    appId: "1:988503060718:web:4cc25534847923f8ae43ff",
    measurementId: "G-29LPFYQKC6"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {storage, firebase as default};