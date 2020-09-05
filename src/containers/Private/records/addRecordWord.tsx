import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../../reducers'
// import components
import AddRecordWordScreen from '../../../screens/Private/Records/Modals/TweetForm'
// import types
import { 
  RecordState, 
  RecordItemType,
  RequestSubmitRecords
} from '../../../types/Record'
// import actions
import { 
  requestSubmitRecords,
  initializeRecords
} from '../../../slice/record'


export interface AddRecordWordProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    requestSubmitRecords: (arg: RequestSubmitRecords) => void
    initializeRecords: () => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.records
  }
}

const mapDistanceToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({
      requestSubmitRecords,
      initializeRecords
    }, dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDistanceToProps
)(AddRecordWordScreen)