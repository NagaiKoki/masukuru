import React from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import selectors
import userSelector from '../../selectors/user'
// import components
import Button from '../../common/Button'
import OutlineButton from '../../common/Button/OutlineButton'
// import apis
import { requestPatchApplausedReviewed } from '../../apis/Review'
// import slice
import { closeApplauseModal } from '../../slice/record'
// import constants
import { APP_STORE_ID } from '../../constants/appStore'
import { COLORS } from '../../constants/Styles'

const ReviewButton = () => {
  const dispatch = useDispatch()
  const { currentUser } = userSelector()
  const appStoreUrl = `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${APP_STORE_ID}?action=write-review`

  const handleOnClose = () => {
    dispatch(closeApplauseModal())
  }

  const handleOnReviewRequest = async () => {
    Linking.openURL(appStoreUrl)
    await requestPatchApplausedReviewed()
  }

  return (
    <Container>
      <ButtonWrapper>
        <OutlineButton text="閉じる" color={COLORS.SUB_BLACK} handleOnClick={handleOnClose} />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button text="マスクルをレビューする" handleOnClick={handleOnReviewRequest} />
      </ButtonWrapper>
    </Container>
  )
}

export default ReviewButton

const Container = styled.View`
`

const ButtonWrapper = styled.View``