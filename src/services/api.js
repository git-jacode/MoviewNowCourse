import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAbhoWrQSCQGW3tDsqJllWeNsbbQbXRPcc",
  authDomain: "moviejacode.firebaseapp.com",
  databaseURL: "https://moviejacode.firebaseio.com",
  projectId: "moviejacode",
  storageBucket: "moviejacode.appspot.com",
  messagingSenderId: "907424982616",
  appId: "1:907424982616:web:f3f3b53e5aec418f9b8c2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
