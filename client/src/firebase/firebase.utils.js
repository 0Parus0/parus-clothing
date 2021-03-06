import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { resolve } from 'url';
import { reject } from 'q';

const config = {
  apiKey: "AIzaSyCh0WZ4WQNodzUrFldttbGdNIO9X7RD-Ic",
  authDomain: "parus-clothing-db.firebaseapp.com",
  databaseURL: "https://parus-clothing-db.firebaseio.com",
  projectId: "parus-clothing-db",
  storageBucket: "parus-clothing-db.appspot.com",
  messagingSenderId: "934945004510",
  appId: "1:934945004510:web:0a458d6b0455fea8d99b4f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch(); // batches all the files together
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // sets id of every document a unique key
    batch.set(newDocRef, obj);

  });

  return await batch.commit();
};


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, 
      items
    }
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } ,{})
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
