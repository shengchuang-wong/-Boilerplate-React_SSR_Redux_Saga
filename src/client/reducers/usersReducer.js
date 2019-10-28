import { FETCH_USERS, FETCH_USERS_SUCCESS } from 'client/actions/index'

const initialState = {
  fetching: false,
  response: [],
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, fetching: true, payload: action.payload }
    case FETCH_USERS_SUCCESS:
      return { ...state, fetching: false, response: action.payload }
    default:
      return state
  }
}
