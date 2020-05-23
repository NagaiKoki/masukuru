import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// types
import { RecordState } from '../types/Record'
import { NoticationState } from '../types/Notification'
// import reducers
import recordReducer from './recordReducer'
import notificationReducer from './notificationReducer'
// import saga
import rootSaga from '../sagas/'

export interface RootState {
  records: RecordState
  notifications: NoticationState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(
  combineReducers({
    records: recordReducer,
    notifications: notificationReducer
  }),
  middleware
)

sagaMiddleware.run(rootSaga)

export default store