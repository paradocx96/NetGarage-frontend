import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAFYKO10dYQBfMkIkNt9usAxsb_ImQN78k",
    authDomain: "netgarage-image-upload.firebaseapp.com",
    projectId: "netgarage-image-upload",
    storageBucket: "netgarage-image-upload.appspot.com",
    messagingSenderId: "873385675346",
    appId: "1:873385675346:web:3516304f86bbc726592d8b",
    measurementId: "G-1MXTSRECQM"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};