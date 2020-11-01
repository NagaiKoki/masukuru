import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'

const ErrorBoundary = () => {
  return (
    <Container>
      <Message>エラーが発生しました。</Message>
      <Message>お手数をおかけしますが、アプリを再起動してください。</Message>
    </Container>
  )
}

export default ErrorBoundary

const Container = styled.View`
  flex: 1;
  padding: 100px 20px;
  background: ${COLORS.BASE_WHITE};
`

const Message = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`