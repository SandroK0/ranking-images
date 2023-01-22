import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMjbzQUDZ1XY5RV2enfF2PT8E66IGqtFg",
    authDomain: "ranking-724f7.firebaseapp.com",
    databaseURL: "https://ranking-724f7-default-rtdb.firebaseio.com",
    projectId: "ranking-724f7",
    storageBucket: "ranking-724f7.appspot.com",
    messagingSenderId: "210058955182",
    appId: "1:210058955182:web:acc9e597953133fc72a03f",
    measurementId: "G-CR12KZND4B"
  };

firebase.initializeApp(firebaseConfig)

export default firebase