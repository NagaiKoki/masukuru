import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import reducers
import { RootState } from '../../../reducers'
import { NoticationState } from '../../../types/Notification'
import { COLORS } from '../../../constants/Styles'

interface NotificationProps {
  notifications: NoticationState
}

const NotificationBatchIcon = (props: NotificationProps) => {
  const { notifications } = props
  const { unReadSize } = notifications

  if (!unReadSize) {
    return null
  }

  return (
    <BatchCointainer>
      <BatchText>{unReadSize}</BatchText>
    </BatchCointainer> 
  )
}

const BatchCointainer = styled.View`
  position: absolute;
  z-index: 1000;
  top: -2px;
  right: 28px;
  min-width: 22px;
  height: 22px;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.BATCH_COLOR};
`

const BatchText = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
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
