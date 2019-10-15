import { put, takeLatest, all, call, fork } from 'redux-saga/effects'
import axios from 'axios';
import { fetchUsersSuccess } from '../actions'
import { push } from 'connected-react-router'

// export function* helloSaga() {
//   console.log('Hello Sagas!')
// }

const fetchUsersService = () => {
  return axios.get('http://react-ssr-api.herokuapp.com/users');
}

function* fetchUsersSaga() {
  try {
    const response = yield call(fetchUsersService)
    if (response.status >= 200 && response.status < 300) {
      yield put(
        fetchUsersSuccess(
          response.data
        )
      )
      // if (typeof window !== undefined) {
      //   yield put(push('/'))
      // }
    }
  } catch (err) {
    console.log('err', err)
  }
}

function* watchFetchUsers() {
  yield takeLatest('FETCH_USERS', fetchUsersSaga)
}

export default function* rootSaga() {
  yield all([
    // helloSaga(),
    watchFetchUsers()
  ])
}