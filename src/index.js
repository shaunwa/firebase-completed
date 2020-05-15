import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './index.css';
import { App, serviceWorker } from './app';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
firebase.analytics();

// This is where the magic happens. React renders our App component
// inside the div with the id "root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
