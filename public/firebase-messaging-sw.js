// Scripts for firebase and firebase messaging
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBya5C9P7cI53YFFfboQDmyVycyP0g4mBs",
  authDomain: "mediatamawebbooking.firebaseapp.com",
  projectId: "mediatamawebbooking",
  storageBucket: "mediatamawebbooking.appspot.com",
  messagingSenderId: "517301118578",
  appId: "1:517301118578:web:7d918305fa9ebbb98544eb",
  measurementId: "G-XHL9C05FT2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = app.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});