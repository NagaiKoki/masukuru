import { Task } from 'redux-saga'
import { fork, delay } from 'redux-saga/effects'
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

export const createLazily = (msec = 1000) => {
  let ongoing: Task | undefined
  // eslint-disable-next-line
  return function*(task: any, ...args: any[]) {
    if (ongoing && ongoing.isRunning()) {
      ongoing.cancel()
    }
    // eslint-disable-next-line
    ongoing = yield fork(function*() {
      yield delay(msec)
      yield fork(task, ...args)
    })
  }
}