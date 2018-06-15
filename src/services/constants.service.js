import * as firebase from 'firebase';

export const constantsService = {

  firebase: {
    apiKey: 'AIzaSyCa88aFSfQzjoV8DVUzwjgT79a9dMnrooQ',
    authDomain: 'akokov-react-test.firebaseapp.com',
    databaseURL: 'https://akokov-react-test.firebaseio.com',
    projectId: 'akokov-react-test',
    storageBucket: 'akokov-react-test.appspot.com',
    messagingSenderId: '622006230182',
  },

  giphy: {
    apiKey: 'apXfiM846tWSIHBe1WHtlI2SUVUb8yTA',
    giphyUrl: 'http://api.giphy.com/v1/gifs',
  }

};

firebase.initializeApp(constantsService.firebase);
