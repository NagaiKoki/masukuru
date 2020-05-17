import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'
// import components
import AddRecordWordScreen from '../../screens/Records/Modals/addRecordWord'
// import types
import { RecordState, RecordItemType } from '../../types/Record'
// import actions
import { 
  onChangeWord, 
  requestSubmitRecords,
  setRecordError
} from '../../actions'


export interface AddRecordWordProps {
  navigation: any
  route: any
  records: RecordState
  actions: {
    onChangeWord: (word: string) => void
    requestSubmitRecords: (records: RecordItemType[], word: string) => void
    setRecordError: (error: string) => void
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
      onChangeWord,
      requestSubmitRecords,
      setRecordError
    }, dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDistanceToProps
)(AddRecordWordScreen)