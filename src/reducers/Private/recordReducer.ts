// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
  ON_CHANGE_DISTANCE,
  ON_CHANGE_TIME,
  ON_CHANGE_WORD,
  REQUEST_SUBMIT_RECORDS,
  SUCCESS_SUBMIT_RECORDS,
  FAILURE_SUBMIT_RECORDS,
  REQUEST_FETCH_RECORDS,
  SUCCESS_FETCH_RECORDS,
  FAILURE_FETCH_RECORDS,
  REQUEST_NEXT_RECORDS,
  SUCCESS_FETCH_NEXT_RECORDS,
  FAILURE_FETCH_NEXT_RECORDS,
  INITIALIZE_RECORDS,
  REQUEST_DESTORY_RECORD,
  SUCCESS_DESTROY_RECORD,
  FAILURE_DESTROY_RECORD,
  CHANGE_RECORD_COMMENT_TEXT,
  SUCCESS_POST_RECORD_COMMENT,
  FAILURE_POST_RECORD_COMMENT,
  REQUEST_FETCH_RECORD_COMMENTS,
  SUCCESS_FETCH_RECORD_COMMENTS,
  FAILURE_FETCH_RECORD_COMMENTS,
} from '../../actions/actionTypes'
// import types
import { RecordState, RecordItemType, RecordActionTypes } from '../../types/Record'

const initialState: RecordState = {
  recordItems: [],
  word: '',
  temporaryName: '',
  temporaryTime: '',
  temporaryDistance: '',
  temporaryamounts: [],
  temporaryWeights: [],
  error: '',
  isLoading: false,
  recordData: [],
  beforeRecordSize: 0,
  userRecords: [],
  beforeUserRecordSize: 0,
  temporaryComment: '',
  commentPostError: '',
  comments: []
}

const recordReducer = (
  state = initialState,
  action: RecordActionTypes
): RecordState => {
  switch (action.type) {

    // 記録の作成 ////////////////////////////////////////
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
        temporaryDistance: '',
        temporaryTime: ''
      }
    }

    // 記録の削除(state)
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

    // 記録の削除(firestore)
    case REQUEST_DESTORY_RECORD: {
      return {
        ...state
      }
    }

    // 記録の削除成功(firestore)
    case SUCCESS_DESTROY_RECORD: {
      const { id } = action
      const filteredRecords = state.recordData.filter(data => data.id !== id)
      const filteredUserRecords = state.userRecords.filter(data => data.id !== id)
      return {
        ...state,
        recordData: filteredRecords,
        userRecords: filteredUserRecords
      }
    }

    // 記録の削除失敗
    case FAILURE_DESTROY_RECORD: {
      const { error } = action
      return {
        ...state,
        error
      }
    }

    // 記録の初期化
    case INITIALIZE_RECORDS: {
      return {
        recordItems: [],
        word: '',
        temporaryName: '',
        temporaryTime: '',
        temporaryDistance: '',
        temporaryamounts: [],
        temporaryWeights: [],
        error: '',
        isLoading: false,
        recordData: [],
        beforeRecordSize: 0,
        userRecords: [],
        beforeUserRecordSize: 0,
        temporaryComment: '',
        commentPostError: '',
        comments: []
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

    // 記録の保存
    case REQUEST_SUBMIT_RECORDS: {
      return {
        ...state,
        isLoading: true
      }
    }

    // 記録の保存成功
    case SUCCESS_SUBMIT_RECORDS: {
      return {
        ...state,
        recordItems: [],
        word: '',
        temporaryName: '',
        temporaryTime: '',
        temporaryDistance: '',
        temporaryamounts: [],
        temporaryWeights: [],
        error: '',
        isLoading: false
      }
    }
    // 記録の保存失敗
    case FAILURE_SUBMIT_RECORDS: {
      const { error } = action
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    // 記録のひとこと
    case ON_CHANGE_WORD: {
      const { payload } = action
      return {
        ...state,
        word: payload
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
        temporaryDistance: String(payload)
      }
    }

    // 時間検知
    case ON_CHANGE_TIME: {
     const { payload } = action
     return {
       ...state,
       temporaryTime: String(payload)
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

    // 記録の読み込み ////////////////////////////////////////
    // 記録の取得
    case REQUEST_FETCH_RECORDS: {
      return {
        ...state,
        isLoading: true,
      }
    }

    // 記録の取得成功
    case SUCCESS_FETCH_RECORDS: {
      const { payload, uid, groupId } = action
      if (uid) {
        return {
          ...state,
          userRecords: payload,
          isLoading: false
        }
      } else if (groupId) {
        return {
          ...state,
          recordData: payload,
          isLoading: false
        }
      } else {
        return state
      }
    }

    // 記録の取得失敗
    case FAILURE_FETCH_RECORDS: {
      const { error } = action
      return {
        ...state,
        error
      }
    }

    // 記録の追加読み込み
    case REQUEST_NEXT_RECORDS: {
      return {
        ...state,
        isLoading: true
      }
    }

    // 記録の追加読み込み成功
    case SUCCESS_FETCH_NEXT_RECORDS: {
      const { payload, uid, groupId } = action
      if (uid) {
        const { userRecords } = state
        const updateRecords = userRecords.concat(payload)
        return {
          ...state,
          userRecords: updateRecords,
          beforeRecordSize: state.userRecords.length,
          isLoading: false
        }
      } else if (groupId) {
        const { recordData } = state
        const updateRecords = recordData.concat(payload)
        return {
          ...state,
          recordData: updateRecords,
          beforeUserRecordSize: state.recordData.length,
          isLoading: false
        }
      } else {
        return state
      }
    }

    // 記録の追加読み込み失敗
    case FAILURE_FETCH_NEXT_RECORDS: {
      const { error } = action
      return {
        ...state,
        error: error,
        isLoading: false
      }
    }

    // 記録へのリアクション ////////////////////////////////////////
    // 記録へのコメント入力検知
    case CHANGE_RECORD_COMMENT_TEXT: {
      const { text } = action
      return {
        ...state,
        temporaryComment: text
      }
    }

    // 記録へのコメント成功
    case SUCCESS_POST_RECORD_COMMENT: {
      const { payload } = action
      const comments = [...state.comments, payload]
      return {
        ...state,
        comments
      }
    }

    // 記録へのコメント失敗
    case FAILURE_POST_RECORD_COMMENT: {
      const { error } = action
      return {
        ...state,
        commentPostError: error
      }
    }

    // 記録のコメント取得
    case REQUEST_FETCH_RECORD_COMMENTS: {
      return {
        ...state,
        isLoading: true
      }
    }

    // 記録のコメント取得成功
    case SUCCESS_FETCH_RECORD_COMMENTS: {
      const { payload } = action
      return {
        ...state,
        comments: payload,
        isLoading: false
      }
    }

    // 記録のコメント取得失敗
    case FAILURE_FETCH_RECORD_COMMENTS: {
      const { error } = action
      return {
        ...state,
        error,
        isLoading: false
      }
    }
    
    default:
      return state
  }
}

export default recordReducer