import React from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import apis
import { requestPatchApplausedReviewed } from '../../apis/Review'
// import slice
import { closeApplauseModal } from '../../slice/record'
// import constants
import { APP_STORE_ID } from '../../constants/appStore'
import { COLORS } from '../../constants/Styles'

const ReviewButton = () => {
  const dispatch = useDispatch()
  const appStoreUrl = `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${APP_STORE_ID}?action=write-review`

  const handleOnClose = async () => {
    await requestPatchApplausedReviewed()
    dispatch(closeApplauseModal())
  }

  const handleOnReviewRequest = async () => {
    Linking.openURL(appStoreUrl)
    await requestPatchApplausedReviewed()
    handleOnClose()
  }

  return (
    <Container>
      <ButtonWrapper isClose={true} activeOpacity={0.7} onPress={handleOnClose}>
        <ButtonText isClose={true}>閉じる</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper activeOpacity={0.7} onPress={handleOnReviewRequest}>
        <ButtonText>マスクルをレビューする</ButtonText>
        <Icon  name="star" size={20} style={{ color: COLORS.BASE_WHITE, marginLeft: 5 }} />
      </ButtonWrapper>
    </Container>
  )
}

export default ReviewButton

const Container = styled.View`
  margin-top: 20px;
  background: ${COLORS.BASE_WHITE};
`

const ButtonWrapper = styled.TouchableOpacity<{ isClose?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: ${props => props.isClose ? 1 : 0 };
  border-top-color: ${props => props.isClose ? COLORS.BASE_BORDER_COLOR : 0 };
  padding: 15px 0;
  background: ${props => props.isClose ? COLORS.BASE_WHITE : COLORS.BASE_MUSCLEW};
`

const ButtonText = styled.Text<{ isClose?: boolean }>`
  color: ${props => props.isClose ? COLORS.BASE_BLACK : COLORS.BASE_WHITE};
  font-weight: ${props => props.isClose ? 300 : 'bold'};
  font-size: 16px;
  text-align: center;
`