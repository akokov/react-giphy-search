import { from } from 'rxjs';
import {appFirebase} from './constants.service';

const apiFirebase = {

  getFavorites: (
    username,
  ) => {

    const firestore = appFirebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    return from(
      //db.collection("cities").where("capital", "==", true)
      firestore.collection('favorites').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
    );

  },

};

export default apiFirebase;