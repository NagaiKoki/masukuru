import React from 'react'
import { Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom'
import { Overlay } from 'react-native-elements';
// import types
import { ToggleImageModalType } from '../../types/ui'

type PropsType = {
  isOpen: boolean
  handleOnClose: (arg: ToggleImageModalType) => void
}

const ZoomImageModal = (props: PropsType) => {
  const { isOpen, handleOnClose } = props
  const CROP_WIDTH = Dimensions.get('window').width
  const CROP_HEIGHT = Dimensions.get('window').height
  const IMAGE_WIDTH = 200
  const IMAGE_HEIGHT = 200

  const onClose = () => {
    handleOnClose({ isOpen: false })
  }

  const renderImage = isOpen && 
    <ImageZoom
      cropWidth={CROP_WIDTH}
      cropHeight={CROP_HEIGHT}
      imageWidth={IMAGE_WIDTH}
      imageHeight={IMAGE_HEIGHT}
      onClick={onClose}
      style={{ backgroundColor: 'red', zIndex: 10000 }}
    >
      <Image style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/musclew-47ec1.appspot.com/o/image%2Frecord_image_7h9EDdW2iz9ntCpr1gMi?alt=media&token=f616c671-4cc2-4236-b74a-bf1d9fd7c754' }} />
    </ImageZoom>
  
  return <Overlay isVisible={true} children={renderImage} />    
}

export default ZoomImageModal