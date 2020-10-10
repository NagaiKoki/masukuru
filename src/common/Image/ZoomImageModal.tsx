import React from 'react'
import { Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom'

type PropsType = {
  imageUrl: string
  handleOnClose: () => void
}

const ZoomImageModal = (props: PropsType) => {
  const { imageUrl, handleOnClose } = props
  const CROP_WIDTH = Dimensions.get('window').width
  const CROP_HEIGHT = Dimensions.get('window').height
  const IMAGE_WIDTH = 200
  const IMAGE_HEIGHT = 200


  return (
    <ImageZoom
      cropWidth={CROP_WIDTH}
      cropHeight={CROP_HEIGHT}
      imageWidth={IMAGE_WIDTH}
      imageHeight={IMAGE_HEIGHT}
    >
      <Image style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }} source={{ uri: imageUrl }} />
    </ImageZoom>
  )
}

export default ZoomImageModal