import {
  from,
  ReplaySubject
} from 'rxjs';
import { firebaseAuthRef } from './constants';

const apiAuth = {

  login: (
    username,
    password
  ) => {
    return from(
      firebaseAuthRef.signInWithEmailAndPassword(username, password)
    );

  },

  logout: () => {
    return from(
      firebaseAuthRef.signOut()
    );
  },

  signup: (
    username,
    password
  ) => {
    return from(
      firebaseAuthRef.createUserWithEmailAndPassword(username, password)
    );
  },

  getUser: () => {
    const observer = new ReplaySubject(1);
    firebaseAuthRef.onAuthStateChanged(observer);

    return observer;
  },

};

export default apiAuth;