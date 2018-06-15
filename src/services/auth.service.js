import {
  from,
  ReplaySubject
} from 'rxjs';
import {appFirebase} from './constants.service';

const apiAuth = {

  login: (
    username,
    password
  ) => {
    return from(
      appFirebase.auth().signInWithEmailAndPassword(username, password)
    );

  },

  logout: () => {
    return from(
      appFirebase.auth().signOut()
    );
  },

  signup: (
    username,
    password
  ) => {
    return from(
      appFirebase.auth().createUserWithEmailAndPassword(username, password)
    );
  },

  getUser: () => {
    const observer = new ReplaySubject(1);
    appFirebase.auth().onAuthStateChanged(observer);

    return observer;
  },

};

export default apiAuth;