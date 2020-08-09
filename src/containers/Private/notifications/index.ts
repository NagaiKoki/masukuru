import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import types
import { RootState } from '../../../reducers'
import { NoticationState } from '../../../types/Notification'
// import actions
import {
  requestReadNotification,
  requestFetchNotifications,
  requestFetchNotReadNotificationNumber
} from '../../../actions/notifications'
// import screens
import NotificationScreen from '../../../screens/Private/Notifications'

export interface NotificationProps {
  navigation: any
  route: any
  notifications: NoticationState
  actions: {
    requestFetchNotifications: () => void
    requestReadNotification: (id: string) => void
    requestFetchNotReadNotificationNumber: () => void
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
      requestFetchNotifications,
      requestReadNotification,
      requestFetchNotReadNotificationNumber
    }
    , dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen)