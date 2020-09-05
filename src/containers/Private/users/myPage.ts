import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { 
  RecordState, 
  ResponseRecordType,
  RequestFetchRecordType,
  RequestNextRecords
} from '../../../types/Record'
// import actions
import {
  requestFetchRecords,
  requestNextRecords,
  requestDestroyRecord
} from '../../../slice/record'
// import screens
import MyPageScreen from '../../../screens/Private/MyPage/MyPage'

export interface UserProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    requestFetchRecords: (arg: RequestFetchRecordType) => void
    requestNextRecords: (arg: RequestNextRecords) => void
    requestDestroyRecord: (id: string) => void
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
      requestNextRecords,
      requestDestroyRecord
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageScreen)