import React, { memo } from 'react';
import { Snackbar } from 'react-native-paper';
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles';

type ToastProps = {
  type?: string,
  message: string,
  onDismiss: () => void
}

const Toast = (props: ToastProps) => {
  const { type = "error", message, onDismiss } = props;

  return (
    <Container>
      <Snackbar
        visible={!!String(message)}
        duration={3000}
        onDismiss={onDismiss}
        style={{ backgroundColor: type === "error" ? COLORS.ERROR_MESSAGE : COLORS.SUCCESS_MESSAGE }}
      >
        <Message>{message}</Message>
      </Snackbar>
  </Container>
  )
}

const Container = styled.View`
  width: 100%;
  position: absolute;
  top: 9%;
  z-index: 1000;
`

const Message = styled.Text`
  font-size: 14px;
`

export default Toast;