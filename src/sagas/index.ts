import { fork } from 'redux-saga/effects'
// import sagas
import recordSaga from './record'
import notificationSaga from './notification'
import userSaga from './user'
import suggestRecord from './suggestRecord'

export default function* rootSaga() {
  yield fork(recordSaga)
  yield fork(notificationSaga)
  yield fork(userSaga)
  yield fork(suggestRecord)
}