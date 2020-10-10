import React from 'react'
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components'
import ImageZoom from 'react-native-image-pan-zoom'
import { Overlay } from 'react-native-elements';
// import components
import CloseBtn from '../Button/CloseButton'
// import selectors
import { useUiSelector } from '../../selectors/ui'
// import types
import { ToggleImageModalType } from '../../types/ui'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  isOpen: boolean
  handleOnClose: (arg: ToggleImageModalType) => void
}

const ZoomImageModal = (props: PropsType) => {
  const { isOpen, handleOnClose } = props
  const { selectedImage } = useUiSelector()
  const CROP_WIDTH = Dimensions.get('window').width
  const CROP_HEIGHT = Dimensions.get('window').height
  const IMAGE_WIDTH = Dimensions.get('window').width
  const IMAGE_HEIGHT = 250

  const onClose = () => {
    handleOnClose({ isOpen: false })
  }

  const renderCloseBtn =
    <CloseBtnWrapper>
      <CloseBtn color="#fff" handleOnClick={onClose} />
    </CloseBtnWrapper>

  const renderImage =
    <ImageZoom
      cropWidth={CROP_WIDTH}
      cropHeight={CROP_HEIGHT}
      imageWidth={IMAGE_WIDTH}
      imageHeight={IMAGE_HEIGHT}
      enableSwipeDown={true}
      useNativeDriver={true}
      style={{ backgroundColor: COLORS.OVERLAY_BACKGROUND, zIndex: 10000 }}
      onSwipeDown={onClose}
    >
      {renderCloseBtn}
      <Image style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }} source={{ uri: selectedImage }} />
    </ImageZoom>
   
  return isOpen && 
    <Overlay 
      isVisible={isOpen} 
      children={renderImage} 
      overlayStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
    />  
}

export default ZoomImageModal

const CloseBtnWrapper = styled.View`
  position: absolute;
  left: 10px;
  top: -35px;
`