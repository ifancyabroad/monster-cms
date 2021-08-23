
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAH_x0j8TgdkLy1isIz9dVewHi4lvOl94",
    authDomain: "monster-manual.firebaseapp.com",
    projectId: "monster-manual",
    storageBucket: "monster-manual.appspot.com",
    messagingSenderId: "275680531047",
    appId: "1:275680531047:web:16c523bb6980423ad77ac2",
    measurementId: "G-L028ZGMC11"
}; //this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();