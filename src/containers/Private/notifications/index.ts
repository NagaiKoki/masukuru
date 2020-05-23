import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { NoticationState } from '../../../types/Notification'
// import actions
import {
  requestReadNotification
} from '../../../actions/notifications'
// import screens
import NotificationContentScreen from '../../../screens/Private/Notifications/NotificationContent'

export interface NotificationProps {
  navigation: any
  route: any
  notifications: NoticationState
  actions: {
    requestReadNotification: (id: string) => void
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({
      requestReadNotification
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContentScreen)