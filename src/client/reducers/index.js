import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import usersReducer from './usersReducer'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    users: usersReducer
  })

export default createRootReducer

export const reducers = combineReducers({
  users: usersReducer
})
