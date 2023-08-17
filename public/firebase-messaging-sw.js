// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

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