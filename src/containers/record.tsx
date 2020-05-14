import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../reducers'
import { RecordState } from '../types/Record'
// import actions
import {
  addRecord, 
  onChangeTrainingName, 
  onChangeSetCount
} from '../actions/'
// import screens
import RecordModalScreen from '../screens/Records/Modals'

export interface RecordProps {
  navigation: any
  records: RecordState,
  actions: {
    addRecord: () => void
    onChangeTrainingName: (name: string) => void
    onChangeSetCount: (payload: number) => void
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
      onChangeTrainingName, 
      onChangeSetCount 
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordModalScreen)