import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  getFirestore,
  limit,
  orderBy,
  startAfter,
  endAt,
  setDoc,
  doc,
  limitToLast,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

import { app } from './firebaseInit';
const db = getFirestore(app);
export const addUserFirestore = async (uid, userData) => {
  await setDoc(doc(db, 'schmoozeUsers', uid), {
    id: uid,
    ...userData,
  });
};
export const fetchUserData = async (uid) => {
  const docRef = doc(db, 'schmoozeUsers', uid);
  const userSnap = await getDoc(docRef);
  return userSnap.data();
};
// fetch chat rooms of current loggedin user
export const fetchChatRooms = async (userInfo, setChatRoomList) => {
  const chatRoomRef = collection(db, 'chatRooms');
  console.log(userInfo?.id);
  const q = query(chatRoomRef, where('users', 'array-contains', userInfo?.id));
  onSnapshot(q, (querySnapshot) => {
    let chatRooms = [];
    querySnapshot.forEach((doc) => {
      chatRooms.push(doc.data());
    });

    setChatRoomList(chatRooms);
  });
};
export const fetchMessegesByRoomId = async (id, setMessegeList) => {
  const chatRoomRef = collection(db, 'chatRooms', id, 'messeges');
  const q = query(chatRoomRef);
  onSnapshot(q, (querySnapshot) => {
    let messeges = [];
    querySnapshot.forEach((doc) => {
      messeges.push(doc.data());
    });

    setMessegeList(messeges);
  });
};
export const addNewMessegeInRoom = async (roomId, messege) => {
  console.log(roomId, messege, 'messege');
  await setDoc(doc(db, 'chatRooms', roomId, 'messeges', messege.id), messege);
};
export const updateLastMessegeExchagened = async (roomId, messege) => {
  const x = await updateDoc(doc(db, 'chatRooms', roomId), {
    lastMessegeExchanged: messege?.messegeText,
    lastMessegeAt: messege?.sendAt,
  });
  console.log(x, 'ld');
};
