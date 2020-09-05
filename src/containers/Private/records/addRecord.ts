import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { RecordState, RecordItemType } from '../../../types/Record'
// import actions
import {
  addRecord, 
  updateRecord,
} from '../../../slice/record'
// import screens
import AddRecordScreen from '../../../screens/Private/Records/Modals/TrainingForm'

export interface AddRecordProps {
  navigation: any
  route: any
  records: RecordState,
  actions: {
    addRecord: (record: RecordItemType) => void
    updateRecord: (record: RecordItemType) => void
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
      addRecord, 
      updateRecord,
    },
    dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecordScreen)