import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// types
import { RecordState } from '../types/Record'
import { NoticationState } from '../types/Notification'
import { GroupState } from '../types/Group'
// import reducers
import recordReducer from './Private/recordReducer'
import notificationReducer from './Private/notificationReducer'
import groupReducer from './Private/groupReducer'
// import saga
import rootSaga from '../sagas/'

export interface RootState {
  records: RecordState
  notifications: NoticationState
  groups: GroupState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(
  combineReducers({
    records: recordReducer,
    notifications: notificationReducer,
    groups: groupReducer
  }),
  middleware
)

sagaMiddleware.run(rootSaga)

export default store