import {
  from,
  ReplaySubject
} from "rxjs";
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCWFTfVjyWhyvj3PlXMwOYiqp2CSpt7MDw",
  authDomain: "giphy-search-a225c.firebaseapp.com",
  databaseURL: "https://giphy-search-a225c.firebaseio.com",
  projectId: "giphy-search-a225c",
  storageBucket: "giphy-search-a225c.appspot.com",
  messagingSenderId: "489526016041"
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