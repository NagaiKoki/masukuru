import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { Linking } from 'expo';
import Constants from 'expo-constants'
import styled from 'styled-components';
// import constants
import { COLORS } from '../../constants/Styles';
// import components
import BottomModal from '../../common/Modal/BottomModal';

interface FeedbackProps {
  isOpen: boolean
  handleOnClose: () => void
}

const FeedbackModal = (props: FeedbackProps) => {
  const { isOpen, handleOnClose } = props;
 
  const handleInquiryLink = () => {
    Linking.openURL(Constants.manifest.extra.inquiryUrl)
  }

  const handleReview = () => {
    Linking.openURL(Constants.manifest.ios.appStoreUrl)
  }

  return (
    <BottomModal isOpen={isOpen} height={300} onClose={handleOnClose}>
      <Container>
        <FeedbackWrapper>
          <FeedbackBtn onPress={handleReview}>
            <Icon name='staro' size={25} />
            <FeedbackText>マスクルをレビューする</FeedbackText>
          </FeedbackBtn>
          <FeedbackBtn onPress={handleInquiryLink}>
            <Icon name='questioncircleo' size={25} />
            <FeedbackText>お問い合わせする</FeedbackText>
          </FeedbackBtn>
        </FeedbackWrapper>
      </Container>
    </BottomModal>  
  )
}

const Container = styled.View`
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