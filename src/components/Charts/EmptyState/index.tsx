import React from 'react'
import styled from 'styled-components'
import { Linking } from 'react-native'
// import components
import Button from '../../../common/Button'

interface EmptyStateProps {
  text: string
}

const EmptyState = (props: EmptyStateProps) => {
  
  const handleOnClick = () => {
    Linking.openURL('app-settings://privacy')
  }
  return (
    <Container>
      <Button text="click" handleOnClick={handleOnClick} />
    </Container>
  )
}

export default EmptyState;

const Container = styled.View`

`