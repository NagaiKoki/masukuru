import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../reducers'
import { RecordItemType } from '../types/Record'
// import actions
import { addRecord } from '../actions/'
// import screens
import RecordModalScreen from '../screens/Records/Modals'

export interface RecordProps {
  navigation: any
  records: {
    recordItems: RecordItemType[]
  }
  actions: {
    addRecord: () => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    records: state.records
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({ addRecord }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordModalScreen)