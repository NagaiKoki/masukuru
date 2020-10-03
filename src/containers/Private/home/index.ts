import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { 
  RecordState, 
  RequestFetchRecordType,
  RequestNextRecords
} from '../../../types/Record'
// import actions
import { 
  requestFetchRecords,
  requestNextRecords,
  requestDestroyRecord,
  toggleReflesh
} from '../../../slice/record'
import { requestFetchCurrentUserData } from '../../../slice/user'
// import screens
import HomeScreen from '../../../screens/Private/Home'

export interface HomeProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    requestFetchRecords: (arg: RequestFetchRecordType) => void
    requestNextRecords: (arg: RequestNextRecords) => void
    requestDestroyRecord: (id: string) => void
    requestFetchCurrentUserData: (uid: string) => void
    toggleReflesh: (bool: boolean) => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.records,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({
      requestFetchRecords,
      requestNextRecords,
      requestDestroyRecord,
      requestFetchCurrentUserData,
      toggleReflesh
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)