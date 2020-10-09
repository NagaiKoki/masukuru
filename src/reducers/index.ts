import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
// types
import { RecordState } from '../types/Record'
import { NoticationState } from '../types/Notification'
import { GroupState } from '../types/Group'
import { UserState } from '../types/User'
import { SuggestRecordState } from '../types/Search/Record/suggest'
import { ChartState } from '../types/Chart'
import { AuthState } from '../types/auth'
import { UiState } from '../types/ui'
// import reducers
import notificationReducer from './Private/notificationReducer'
import suggestRecordReducer from '../reducers/Private/Search/suggestRecord'
// import slice
import recordSlice from '../slice/record'
import chartSlice from '../slice/chart'
import userSlice from '../slice/user'
import authSlice from '../slice/auth'
import groupSlice from '../slice/group'
import uiSlice from '../slice/ui'
// import saga
import rootSaga from '../sagas/'

export interface RootState {
  records: RecordState
  notifications: NoticationState
  groups: GroupState
  users: UserState
  suggestRecords: SuggestRecordState
  charts: ChartState
  auth: AuthState
  ui: UiState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(
  combineReducers({
    records: recordSlice.reducer,
    notifications: notificationReducer,
    groups: groupSlice.reducer,
    users: userSlice.reducer,
    suggestRecords: suggestRecordReducer,
    charts: chartSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer
  }),
  middleware
)

sagaMiddleware.run(rootSaga)

export default store