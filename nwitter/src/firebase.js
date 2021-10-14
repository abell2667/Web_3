import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDrGjq3VMlPj1Dohj6VgRlhQjsOl90FGHk",
    authDomain: "nwitter-24ca9.firebaseapp.com",
    databaseURL: "https://nwitter-24ca9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nwitter-24ca9",
    storageBucket: "nwitter-24ca9.appspot.com",
    messagingSenderId: "893538047029",
    appId: "1:893538047029:web:713237282180903dd98d7c"
  };

  export default firebase.initializeApp(firebaseConfig);