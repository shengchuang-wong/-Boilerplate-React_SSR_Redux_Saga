import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga'

export default (req) => {
  const sagaMiddleware = createSagaMiddleware()
  let middlewares = [sagaMiddleware]
  if(false) { // false if run in server
    middlewares = [...middlewares, logger]
  }

  const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(...middlewares)));
  store.sagaMiddleware = sagaMiddleware
  store.close = () => store.dispatch(END)

  return store;
}