import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import reducers
import { RootState } from '../../reducers'
import { NoticationState } from '../../types/Notification'

interface NotificationProps {
  notifications: NoticationState
}

const NotificationBatchIcon = (props: NotificationProps) => {
  const { notifications } = props
  const { unReadSize } = notifications

  return (
    <BatchCointainer>
      <BatchText>{unReadSize}</BatchText>
    </BatchCointainer>
    
  )
}

const BatchCointainer = styled.View`
  top: 1;
  right: 1;
  min-width: 13;
  height: 13;
  border-radius: 7;
  align-items: center;
  justify-content: center;
  background-color: red;
`

const BatchText = styled.Text`
  text-align: center;
`

const mapStateToProps = (state: RootState) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps,
  null
)(NotificationBatchIcon)
