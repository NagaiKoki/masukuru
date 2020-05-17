import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../reducers'
import { RecordState, RecordItemType } from '../../types/Record'
// import actions
import {
  addRecord, 
  updateRecord,
  setRecordError,
  onChangeTrainingName, 
  onChangeDistance,
  onChangeTime
} from '../../actions'
// import screens
import AddRecordScreen from '../../screens/Records/Modals/addRecord'

export interface AddRecordProps {
  navigation: any
  route: any
  records: RecordState,
  actions: {
    addRecord: (record: RecordItemType) => void
    updateRecord: (record: RecordItemType) => void
    setRecordError: (error: string) => void
    onChangeTrainingName: (name: string) => void
    onChangeDistance: (distance: number) => void
    onChangeTime: (time: number) => void
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
      setRecordError,
      onChangeTrainingName, 
      onChangeDistance,
      onChangeTime
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecordScreen)