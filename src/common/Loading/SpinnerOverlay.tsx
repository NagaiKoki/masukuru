import React, { useState, useEffect } from 'react';
import Loading from 'react-native-loading-spinner-overlay';
import styled from 'styled-components'

interface SpinnerProps {
  visible: boolean
  handleInVisible: () => void
}

const Spinner = (props: SpinnerProps) => {
  const { visible, handleInVisible } = props

  useEffect(() => {
    setTimeout(() => {
      handleInVisible()
    }, 3000)
  }, [])

  return (
    <Container>
      <Loading 
        visible={visible}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </Container>
  )
}

export default Spinner

const Container = styled.View``