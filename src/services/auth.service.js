import {
  from,
  ReplaySubject
} from 'rxjs';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCa88aFSfQzjoV8DVUzwjgT79a9dMnrooQ',
  authDomain: 'akokov-react-test.firebaseapp.com',
  databaseURL: 'https://akokov-react-test.firebaseio.com',
  projectId: 'akokov-react-test',
  storageBucket: 'akokov-react-test.appspot.com',
  messagingSenderId: '622006230182'
});

const apiAuth = {

  login: (
    username,
    password
  ) => {
    return from(
      firebase.auth().signInWithEmailAndPassword(username, password)
    );

  },

  logout: () => {
    return from(
      firebase.auth().signOut()
    );
  },

  signup: (
    username,
    password
  ) => {
    return from(
      firebase.auth().createUserWithEmailAndPassword(username, password)
    );
  },

  getUser: () => {
    const observer = new ReplaySubject(1);
    firebase.auth().onAuthStateChanged(observer);

    return observer;
  },

};

export default apiAuth;