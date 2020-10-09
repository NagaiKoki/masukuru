import React, { useEffect } from 'react'
import styled from 'styled-components'
// import selectors
import { useUiSelector } from '../../selectors/ui'
// import types
import { ToastMessageType, ToastType } from '../../types/ui'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  toastMessage: ToastMessageType
}

const Toaster = (props: PropsType) => {
  const { toastMessage } = props
  const { type, message } = toastMessage
  const { removeToastMessage }  = useUiSelector()
  const INTERVAL_TIME = 3000

  const handleRemoveToaster = () => {
    removeToastMessage()
  }

  useEffect(() => {
    setTimeout(() => {
      removeToastMessage()
    }, INTERVAL_TIME)
  }, [])

  return (
    <Wrapper type={type} onPress={handleRemoveToaster}>
      <Message>{message}</Message>
    </Wrapper>
  )
}

export default Toaster

const Wrapper = styled.TouchableOpacity<{ type: ToastType }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 55px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  background: ${props => props.type === 'success' ? COLORS.SUCCESS_MESSAGE : COLORS.ERROR_MESSAGE };
`

const Message = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
  font-weight: bold;
`

