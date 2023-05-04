import * as firebase from 'firebase';
import 'firebase/auth';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyDMq5RKd_aXHSYbgxdkqUo5y7kMiYHP5yE",
    authDomain: "proshops-37c1d.firebaseapp.com",
    projectId: "proshops-37c1d",
    storageBucket: "proshops-37c1d.appspot.com",
    messagingSenderId: "494523737293",
    appId: "1:494523737293:web:7d4e024c321e0e332eb584",
    measurementId: "G-TSX03G4GSC"




};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


firebase.initializeApp(firebaseConfig);

export default firebase;
