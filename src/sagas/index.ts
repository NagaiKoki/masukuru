import { fork } from 'redux-saga/effects'
// import sagas
import recordSaga from './record'

export default function* rootSaga() {
  yield fork(recordSaga)
}