import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCkayVHA8SoNLcp919hkbEeEv7rl0otxmY',
  authDomain: 'movienow-9a288.firebaseapp.com',
  databaseURL: 'https://movienow-9a288.firebaseio.com',
  projectId: 'movienow-9a288',
  storageBucket: 'movienow-9a288.appspot.com',
  messagingSenderId: '297164063048',
  appId: '1:297164063048:web:1cd323dc02e934ae46b37d',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
