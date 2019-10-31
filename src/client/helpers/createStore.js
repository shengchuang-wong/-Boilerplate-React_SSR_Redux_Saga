/* eslint-disable */
import { createStore, applyMiddleware } from 'redux'
import { reducers } from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { END } from 'redux-saga'

export default req => {
  const sagaMiddleware = createSagaMiddleware()
  let middlewares = [sagaMiddleware]

  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  store.sagaMiddleware = sagaMiddleware
  store.close = () => store.dispatch(END)

  return store
}
