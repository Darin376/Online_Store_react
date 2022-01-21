import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './Redux/rootReducer';
import { Provider } from 'react-redux';
import "./index.css";
import thunk from 'redux-thunk';
import firebase from "firebase/compat/app";
import firebaseConfig from "./FireBase/fireBaseConfig"
 
firebase.initializeApp(firebaseConfig);
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