import { of } from 'rxjs';
import { favoritesRef } from './constants';

const apiFirebase = {

  getFavorites: (
    username,
  ) => {
    return favoritesRef.on('value', snapshot => {return of(snapshot)});
  },

};

export default apiFirebase;