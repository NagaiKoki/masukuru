import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign'
import { Linking } from 'expo';
import Constants from 'expo-constants'

interface FeedbackProps {
  showFeedbackModal: boolean
  setShowFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const FeedbackModal = (props: FeedbackProps) => {
  const { showFeedbackModal, setShowFeedbackModal } = props;
 
  const handleClose = () => {
    setShowFeedbackModal(false)
  }

  const handleInquiryLink = () => {
    Linking.openURL(Constants.manifest.extra.inquiryUrl)
  }

  const handleReview = () => {
    Linking.openURL(Constants.manifest.ios.appStoreUrl)
  }

  return (
    <Modal isVisible={showFeedbackModal} swipeDirection='down' onSwipeComplete={handleClose}>
      <Container>
        <FeedbackHeader>
          <FeedbackClose onPress={handleClose}>
            <FeedbackCloseText>閉じる</FeedbackCloseText>
          </FeedbackClose>
        </FeedbackHeader>
        <FeedbackWrapper>
          <FeedbackBtn onPress={handleInquiryLink}>
            <Icon name='questioncircleo' size={25} />
            <FeedbackText>お問い合わせする</FeedbackText>
          </FeedbackBtn>
        </FeedbackWrapper>
      </Container>
    </Modal>  
  )
}

const Container = styled.View`
  height: 95%;
  background-color: ${COLORS.BASE_BACKGROUND};
  width: 110%;
  margin-bottom: -25%;
  border-radius: 15px;
  align-self: center;
`

const FeedbackHeader = styled.View`
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #f4f4f4;
  justify-content: center;
`

const FeedbackClose = styled.TouchableOpacity`
 padding-left: 20px;
`

const FeedbackCloseText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const FeedbackWrapper = styled.View`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
`

const FeedbackBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const FeedbackText = styled.Text`
  margin-left: 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
`


export default FeedbackModal;