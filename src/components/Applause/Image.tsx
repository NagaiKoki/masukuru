import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native';
// import utils
import { ApplauseImagePath } from '../../utilities/Image/applause'

interface Props {
  size: number
}

const ApplauseImage = (props: Props) => {
  const { size } = props

  return (
    <ImageWrapper>
      <Image source={ApplauseImagePath(size)} resizeMode="cover" style={{ width: '100%', height: 150, resizeMode: 'cover', alignSelf: 'center' }} />
    </ImageWrapper>
  )
}

export default ApplauseImage

const ImageWrapper = styled.View`

`