export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

export const fetchUsers = payload => {
  // 2nd and 3rd because of thunk.withExtraArgument, api = axiosInstance
  return {
    type: FETCH_USERS,
    payload: payload
  }
}

export const fetchUsersSuccess = payload => {
  // 2nd and 3rd because of thunk.withExtraArgument, api = axiosInstance
  return {
    type: FETCH_USERS_SUCCESS,
    payload: payload
  }
}
