import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyAAH_x0j8TgdkLy1isIz9dVewHi4lvOl94",
	authDomain: "monster-manual.firebaseapp.com",
	projectId: "monster-manual",
	storageBucket: "gs://monster-manual.appspot.com",
	messagingSenderId: "275680531047",
	appId: "1:275680531047:web:16c523bb6980423ad77ac2",
	measurementId: "G-L028ZGMC11",
	databaseURL:
		"https://monster-manual-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const stImages = firebase.storage().ref("images");
export const dbMonsters = firebase.database().ref("monsters");
