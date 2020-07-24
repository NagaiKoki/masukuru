import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { RecordState } from '../../../types/Record'
import { NotificationEventType } from '../../../types/Notification'
import { UserState } from '../../../types/User'
// import actions
import { 
  requestDestroyRecord,
  changeRecordCommentText,
  requestPostRecordComment,
  requestFetchRecordComments,
  requestDeleteRecordComment
} from '../../../actions/records'
import { requestPostPushNotification } from '../../../actions/notifications'
// import screen
import RecordShowScreen from '../../../screens/Private/Records/Show'

export interface RecordShowProps {
  navigation: any
  route: any
  records: RecordState
  users: UserState
  actions: {
    requestDestroyRecord: (id: string) => void
    changeRecordCommentText: (text: string) => void
    requestPostRecordComment: (recordId: string, recordUserId: string) => void 
    requestFetchRecordComments: (recordId: string) => void
    requestDeleteRecordComment: (recordId: string, commentId: string) => void
    requestPostPushNotification: (eventType: NotificationEventType, uid: string, title: string, content: string) => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.records,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({
      requestDestroyRecord,
      changeRecordCommentText,
      requestPostRecordComment,
      requestFetchRecordComments,
      requestDeleteRecordComment,
      requestPostPushNotification
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordShowScreen)