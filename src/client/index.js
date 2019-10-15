import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import Layout from "../common/Layout";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'client/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { createBrowserHistory } from 'history'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'

export const history = createBrowserHistory()

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger, routerMiddleware(history)]
const store = createStore(reducers(history), window.INITIAL_STATE, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga)

renderMethod(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);