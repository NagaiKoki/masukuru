import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../reducers'
import { RecordState, ResponseRecordType } from '../../types/Record'
// import actions
import {
  requestFetchRecords,
  requestNextRecords
} from '../../actions'
// import screens
import MyPageScreen from '../../screens/MyPage/MyPage'

export interface UserProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    requestFetchRecords: (uid?: string, groupId?: string) => void
    requestNextRecords: (lastRecord: ResponseRecordType, uid?: string, groupId?: string) => void
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
      requestFetchRecords,
      requestNextRecords
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageScreen)