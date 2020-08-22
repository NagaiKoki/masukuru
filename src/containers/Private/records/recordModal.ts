import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { RecordState, RecordItemType } from '../../../types/Record'
// import actions
import {
  deleteRecord,
  onChangeTrainingName,
  onChangeRecordDate
} from '../../../actions/records'
// import screens
import RecordModalScreen from '../../../screens/Private/Records/Modals'

export interface RecordProps {
  navigation: any
  records: RecordState,
  actions: {
    deleteRecord: (record: RecordItemType) => void 
    onChangeTrainingName: (name: string) => void
    onChangeRecordDate: (date: Date) => void
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
      deleteRecord,
      onChangeTrainingName,
      onChangeRecordDate
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordModalScreen)