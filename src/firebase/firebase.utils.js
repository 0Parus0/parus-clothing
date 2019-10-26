import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
