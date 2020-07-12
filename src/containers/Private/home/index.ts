import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { RecordState, ResponseRecordType } from '../../../types/Record'
import { UserState } from '../../../types/User'
// import actions
import {
  requestFetchRecords,
  requestNextRecords,
  requestDestroyRecord
} from '../../../actions/records'
import { requestFetchUserData } from '../../../actions/User'
// import screens
import HomeScreen from '../../../screens/Private/Home'

export interface HomeProps {
  navigation: any
  route: any
  records: RecordState
  users: UserState
  actions: {
    requestFetchRecords: (uid: string, groupId: string) => void
    requestNextRecords: (lastRecord: ResponseRecordType, uid: string, groupId: string) => void
    requestDestroyRecord: (id: string) => void
    requestFetchUserData: (uid: string) => void
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
      requestFetchRecords,
      requestNextRecords,
      requestDestroyRecord,
      requestFetchUserData
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)