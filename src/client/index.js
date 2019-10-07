import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import Layout from "../common/Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'client/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger]
const store = createStore(reducers, window.INITIAL_STATE, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga)

renderMethod(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);