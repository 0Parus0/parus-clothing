import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('5ZUNly0qvnas3Ka9tepi').collection('cartItems').doc('HxUhi57qN0i3ZhsRrtEk');

firestore.doc('/users/5ZUNly0qvnas3Ka9tepi/cartItem/HxUhi57qN0i3ZhsRrtEk');
firestore.collection('users/5ZUNly0qvnas3Ka9tepi/cartItems');