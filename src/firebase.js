//to use firebase app
// import firebase from 'firebase/app'; //older version
import firebase from 'firebase/compat/app'; //v9

//to use auth
// import 'firebase/auth'; //older version
import 'firebase/compat/auth'; //v9

//to use firestore
// import 'firebase/firestore'; //Older Version
import 'firebase/compat/firestore'; //v9
// import "firebase/storage"
import "firebase/compat/storage"
let object = require("./secret");
firebase.initializeApp(object);
let auth = firebase.auth();
export const firestore = firebase.firestore();
export const database={
    users:firestore.collection("users"),
    getUserTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
export default auth;

