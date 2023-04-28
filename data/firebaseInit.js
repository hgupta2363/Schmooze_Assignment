import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  initializeAuth,
  signOut,
} from 'firebase/auth';

import { getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCg8HnkPw0wV0jT6JY28k2DXbsYsrJFIXE',
  authDomain: 'schmoozechatapp-e604b.firebaseapp.com',
  projectId: 'schmoozechatapp-e604b',
  storageBucket: 'schmoozechatapp-e604b.appspot.com',
  messagingSenderId: '518068139805',
  appId: '1:518068139805:web:1e1385992cb9f2f2fbd3f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
