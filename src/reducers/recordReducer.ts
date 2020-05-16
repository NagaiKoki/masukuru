// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
  ON_CHANGE_DISTANCE,
  ON_CHANGE_TIME,
} from '../actions/actionTypes'
// import types
import { RecordState, RecordItemType, RecordActionTypes } from '../types/Record/'

const initialState: RecordState = {
  recordItems: [],
  temporaryName: '',
  temporaryTime: 0,
  temporaryDistance: 0,
  temporaryamounts: [],
  temporaryWeights: [],
  error: '',
}

const recordReducer = (
  state = initialState,
  action: RecordActionTypes
): RecordState => {
  switch (action.type) {
    // 記録の追加
    case ADD_RECORD: {
      const { record } = action
      const updateRecordItems = [...state.recordItems, record]
      return {
        ...state,
        recordItems: updateRecordItems,
        temporaryName: '',
        temporaryamounts: [],
        temporaryWeights: [],
        temporaryDistance: 0,
        temporaryTime: 0
      }
    }

    // 記録の削除
    case DELETE_RECORD: {
      const { record } = action
      const { recordItems } = state
      const updateRecordItems = recordItems.filter((item: RecordItemType) => {
        return item.id !== record.id
      })
      return {
        ...state,
        recordItems: updateRecordItems
      }
    }

    // 記録の更新
    case UPDATE_RECORD: {
      const { record } = action
      const { recordItems } = state
      const updateRecordItems = recordItems.map((item: RecordItemType, i: number) => {
        if (item.id === record.id) {
          return recordItems[i] = record
        }
        return item
      })
      return {
        ...state,
        recordItems: updateRecordItems
      }
    }

    // トレーニング名検知
    case ON_CHANGE_TRAINING_NAME: {
      const { name } = action
      return {
        ...state,
        temporaryName: name
      }
    }

    // 距離検知
    case ON_CHANGE_DISTANCE: {
      const { payload } = action
      return {
        ...state,
        temporaryDistance: payload
      }
    }

    // 時間検知
    case ON_CHANGE_TIME: {
     const { payload } = action
     return {
       ...state,
       temporaryTime: payload
     }
    }

    // エラーのセット
    case SET_RECORD_ERROR: {
      const { error } = action
      return {
        ...state,
        error
      }
    }

    default:
      return state
  }
}

export default recordReducer