import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { RecordState } from '../../../types/Record'
// import actions
import { 
  requestDestroyRecord,
  changeRecordCommentText,
  requestPostRecordComment,
  requestFetchRecordComments
} from '../../../actions/records'
// import screen
import RecordShowScreen from '../../../screens/Private/Records/Show'

export interface RecordShowProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    requestDestroyRecord: (id: string) => void
    changeRecordCommentText: (text: string) => void
    requestPostRecordComment: (recordId: string) => void 
    requestFetchRecordComments: (recordId: string) => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.records
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({
      requestDestroyRecord,
      changeRecordCommentText,
      requestPostRecordComment,
      requestFetchRecordComments
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordShowScreen)