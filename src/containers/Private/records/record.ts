import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { 
  RecordState, 
  RequestNextRecords
} from '../../../types/Record'
// import actions
import {
  requestFetchRecords,
  requestNextRecords
} from '../../../slice/record'
// import screens
import RecordScreen from '../../../screens/Private/Records'

export interface RecordProps {
  navigation: any
  records: RecordState
  actions: {
    requestFetchRecords: (uid: string) => void
    requestNextRecords: (arg: RequestNextRecords) => void
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
)(RecordScreen)