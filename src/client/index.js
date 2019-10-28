import 'babel-polyfill'
import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '../common/Layout'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'client/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { createBrowserHistory } from 'history'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { CookiesProvider } from 'react-cookie'
import ErrorBoundary from 'client/components/common/ErrorBoundary/ErrorBoundary'
import { loadableReady } from '@loadable/component'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const middlewares = [
  sagaMiddleware,
  process.env.NODE_ENV === 'development' && logger,
  routerMiddleware(history)
].filter(Boolean)
const store = createStore(
  reducers(history),
  window.INITIAL_STATE,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares)
)
sagaMiddleware.run(rootSaga)

const App = hot(function() {
  return <Layout />
})

loadableReady(() => {
  ReactDOM.hydrate(
    <CookiesProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <ConnectedRouter history={history} key={Math.random()}>
            <App />
          </ConnectedRouter>
        </ErrorBoundary>
      </Provider>
    </CookiesProvider>,
    document.getElementById('root')
  )
})

if (module.hot) {
  module.hot.accept()
}
