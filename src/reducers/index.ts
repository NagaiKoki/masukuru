import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// types
import { RecordState } from '../types/Record'
// import reducers
import recordReducer from './recordReducer'

export interface RootState {
  records: RecordState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(
  combineReducers({
    records: recordReducer
  }),
  middleware
)

sagaMiddleware.run(null)

export default store