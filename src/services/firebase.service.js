import { from } from 'rxjs';
import { of } from 'rxjs';
import { appFirebase } from './constants';

const apiFirebase = {

  getFavorites: (
    username,
  ) => {

    /*Real-time database approach*/
    let favouritesRef = appFirebase.database().ref().child('favourites');

    favouritesRef.on('value', (snapshot)=>{
      console.log(snapshot.val());
    });


    /*Cloud database approach*/
    const firestore = appFirebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    return from(
      firestore.collection('favorites').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
        });
      })
    );
  },

};

export default apiFirebase;