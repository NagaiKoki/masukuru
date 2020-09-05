import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// types
import { RecordState } from '../types/Record'
import { NoticationState } from '../types/Notification'
import { GroupState } from '../types/Group'
import { UserState } from '../types/User'
import { SuggestRecordState } from '../types/Search/Record/suggest'
// import reducers
import notificationReducer from './Private/notificationReducer'
import groupReducer from './Private/groupReducer'
import userReducer from './Private/userReducer'
import suggestRecordReducer from '../reducers/Private/Search/suggestRecord'
// import slice
import recordSlice from '../slice/record'
// import saga
import rootSaga from '../sagas/'

export interface RootState {
  records: RecordState
  notifications: NoticationState
  groups: GroupState
  users: UserState
  suggestRecords: SuggestRecordState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(
  combineReducers({
    records: recordSlice.reducer,
    notifications: notificationReducer,
    groups: groupReducer,
    users: userReducer,
    suggestRecords: suggestRecordReducer
  }),
  middleware
)

sagaMiddleware.run(rootSaga)

export default store