import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './Redux/rootReducer';
import { Provider } from 'react-redux';
import "./index.css";
import thunk from 'redux-thunk';
// import {db} from './FireBase/FireBaseConfig';
import firebase from "firebase/compat/app";
 
firebase.initializeApp({
    apiKey: "AIzaSyAml3mGu2gBEU0hHRSYq75e755Y_VXJ6cc",
    authDomain: "shop-a636c.firebaseapp.com",
    projectId: "shop-a636c",
    storageBucket: "shop-a636c.appspot.com",
    messagingSenderId: "607649131995",
    appId: "1:607649131995:web:c312644238b40ae6314bfe",
    measurementId: "G-7B2KF7PVDM"
  });

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    )
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
 