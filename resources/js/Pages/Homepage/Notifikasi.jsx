import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyARVfZ38nDiRXDabNl0FvU6_a_LZ1AU5no",
    authDomain: "flutter1-a6047.firebaseapp.com",
    databaseURL: "https://flutter1-a6047-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "flutter1-a6047",
    storageBucket: "flutter1-a6047.appspot.com",
    messagingSenderId: "747771514990",
    appId: "1:747771514990:web:bd2f9053c208df9c56167f",
    measurementId: "G-FDPTZ2R5KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
