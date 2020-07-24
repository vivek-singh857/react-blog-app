import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCf_CoyEYbh8RcFtpZ5BSRVVrYAcLTdB28",
    authDomain: "blog-app-911f4.firebaseapp.com",
    databaseURL: "https://blog-app-911f4.firebaseio.com",
    projectId: "blog-app-911f4",
    storageBucket: "blog-app-911f4.appspot.com",
    messagingSenderId: "1000500677727",
    appId: "1:1000500677727:web:070902bc2a63501742dfea",
    measurementId: "G-GTZJ2NZEY5"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();


export { storage, firebase as default };