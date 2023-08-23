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
  return getToken(messaging, { vapidKey: "BBh84f-N7Ru1OJpkXbWsT3y3VrxmX_1s9GdXFdLBa2-eAAaTyQIPTFeVuKs6dNQSM7aKzOK8J7tCKcgUizKe30k" })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('token saat ini: ', currentToken);
        return currentToken;
      } else {
        console.log('Token pendaftaran tidak tersedia. Minta izin untuk membuatnya.');
      }
    })
    .catch((err) => {
      console.log('Terjadi kesalahan saat mengambil token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });