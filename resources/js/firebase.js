import { getMessaging, getToken, onMessage} from 'firebase/messaging';
import { initializeApp } from "firebase/app";


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

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BFIX6e5pN8QNGKq7LgKs1gRWYeuRbJ1bXFOM236Gf_T71qETEgyrmIHq1gnZjvncDa-p7qMU-ws9C2yV8hXYK8M" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

