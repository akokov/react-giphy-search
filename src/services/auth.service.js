import {
  from,
  ReplaySubject
} from 'rxjs';
import * as firebase from 'firebase';

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