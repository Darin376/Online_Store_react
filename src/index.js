import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './Redux/rootReducer';
import { Provider } from 'react-redux';
import "./index.css";
import thunk from 'redux-thunk';
import {db} from './FireBase/FireBaseConfig';

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
 