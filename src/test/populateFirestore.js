const firebase = require('firebase');
require('firebase/firestore');

const { reservations, restaurants, dateAvailabilities, reviews } = require('./testData');

var firebaseConfig = {
    apiKey: "AIzaSyDXne4P39h2jDXJ9bE8Wc84XUlllRf3mhw",
    authDomain: "restaurant-reservations-144e5.firebaseapp.com",
    databaseURL: "https://restaurant-reservations-144e5.firebaseio.com",
    projectId: "restaurant-reservations-144e5",
    storageBucket: "restaurant-reservations-144e5.appspot.com",
    messagingSenderId: "485604802640",
    appId: "1:485604802640:web:5366bbb357e741e67d5155",
    measurementId: "G-3DQ4Q3QZQC"
  };
  
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  function populateCollection(collectionName, items) {
      return Promise.all(items.map(item => {
          const { id, ...data } = item;
          return db.collection(collectionName)
            .doc(id)
            .set(data);
      }));
  }

  Promise.all([
      populateCollection('reservations', reservations),
      populateCollection('reviews', reviews),
      populateCollection('restaurants', restaurants),
      populateCollection('dateAvailabilities', dateAvailabilities),
  ])
  .then(() => {
      console.log('Done!');
      process.exit(0);
  })
  .catch(err => {
      console.log(err);
  });