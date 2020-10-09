import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native';
// import constants
import { COLORS } from '../../constants/Styles';

type PropsType = {
  text: string
}

const EmptyState = (props: PropsType) => {
  const { text } = props

  return (
    <Wrapper>
      <ImageWrapper>
        <Image source={require('../../assets/emptyState.png')} resizeMode="cover" style={{ width: '100%', height: 80, resizeMode: 'cover', alignSelf: 'center' }} />
      </ImageWrapper>
      <Text>{text}</Text>
    </Wrapper>
  )
}

export default EmptyState

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const ImageWrapper = styled.View`
  width: 80px;
`

const Text = styled.Text`
  padding-top: 30px;
  line-height: 23;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  text-align: center;
`

const ButtonWrapper = styled.View`
  padding-top: 25px;
  width: 150px;
`