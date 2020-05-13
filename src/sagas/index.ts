import { take } from 'redux-saga/effects'

export default function* rootSaga() {
  yield take('TEST')
}