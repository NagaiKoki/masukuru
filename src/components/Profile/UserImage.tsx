import React from 'react'
import styled from 'styled-components'
// import components
import UserImage from '../Image/userImage'
// import selectors
import { useUiSelector } from '../../selectors/ui'
// import constants
import { IMAGE_URL } from '../../constants/imageUrl'

type Props = {
  imageUrl: string
}

const ProfileUserImage = (props: Props) => {
  const { imageUrl } = props
  const { toggleImageModal } = useUiSelector()

  const handleOpenImageModal = () => {
    toggleImageModal({ isOpen: true, imageUrl: imageUrl || IMAGE_URL.DEFAULT_PROFILE_IMAGE })
  }

  return (
    <ImageWrapper onPress={handleOpenImageModal}>
      <UserImage uri={imageUrl} width={60} height={60} borderRadius={60} />
    </ImageWrapper>
  )
}

export default ProfileUserImage

const ImageWrapper = styled.TouchableOpacity`
`