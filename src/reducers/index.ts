import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// types
import { RecordState } from '../types/Record'

export interface RootState {
  records: RecordState
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers({

  }),
  sagaMiddleware
)

sagaMiddleware.run(null)

export default store