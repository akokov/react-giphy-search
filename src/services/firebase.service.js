import { from } from 'rxjs';
import * as firebase from 'firebase';

const apiFirebase = {

  getFavorites: (
    username,
  ) => {
    return from(
      //db.collection("cities").where("capital", "==", true)
      firebase.database().collection('favorites').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
    );

  },

};

export default apiFirebase;