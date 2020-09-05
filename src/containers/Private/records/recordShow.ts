import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { 
  RecordState,
  RequestPostRecordComment
} from '../../../types/Record'
import { NotificationEventType } from '../../../types/Notification'
import { UserState } from '../../../types/User'
// import actions
import { 
  requestDestroyRecord,
  requestPostRecordComment,
  requestFetchRecordComments,
  requestDeleteRecordComment
} from '../../../slice/record'
import { requestFetchUserData } from '../../../actions/User'
import { requestPostPushNotification } from '../../../actions/notifications'
// import screen
import RecordShowScreen from '../../../screens/Private/Records/Show'

export interface RecordShowProps {
  navigation: any
  route: any
  records: RecordState
  users: UserState
  actions: {
    requestFetchUserData: (uid: string) => void
    requestDestroyRecord: (id: string) => void
    requestPostRecordComment: (arg: RequestPostRecordComment) => void 
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
      requestFetchUserData,
      requestDestroyRecord,
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