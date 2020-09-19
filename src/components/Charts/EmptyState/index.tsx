import React from 'react'
import styled from 'styled-components'
import { Linking } from 'react-native'
// import components
import Button from '../../../common/Button'
// import constants
import { COLORS } from '../../../constants/Styles';

interface EmptyStateProps {
  text: string
}

const EmptyState = (props: EmptyStateProps) => {
  const { text } = props
  const handleOnClick = () => {
    Linking.openURL('app-settings://privacy')
  }
  return (
    <Container>
      <ExplanationText>歩数を計測するには、デバイスの許可が必要です。</ExplanationText>
      <ButtonWrapper>
        <Button text={text} handleOnClick={handleOnClick} />
      </ButtonWrapper>
    </Container>
  )
}

export default EmptyState;

const Container = styled.View`
  flex: 1;
  padding: 40px 0;
`

const ButtonWrapper = styled.View`
  width: 200px;
  margin: 0 auto;
`

const ExplanationText = styled.Text`
  padding-bottom: 20px;
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
  text-align: center;
`