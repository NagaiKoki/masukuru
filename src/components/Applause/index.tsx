import React from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
// import components
import CloseButton from '../../common/Button/CloseButton'
import ApplauseImage from './Image'
// import constants
import { COLORS } from '../../constants/Styles'
// import slices
import { closeApplauseModal } from '../../slice/record'
// import selectors
import recordSelector from '../../selectors/record'

const Applause = () => {
  const dispatch = useDispatch()
  const { isOpenApplause, recordSize } = recordSelector()

  const handleOnClose = () => {
    dispatch(closeApplauseModal())
  }

  return (
    <Modal isVisible={true}>
      <ApplauseWrapper>
        <Title>運営からのお知らせ</Title>
        <ApplauseImage  size={recordSize} />
        <SubTitle>{recordSize}回目のトレーニングお疲れ様でした♪</SubTitle>
        <CloseButtonWrapper>
          <CloseBtn onPress={handleOnClose}>
            <CloseText>閉じる</CloseText>
          </CloseBtn>
        </CloseButtonWrapper>
      </ApplauseWrapper>
    </Modal>
  )
}

export default Applause

const ApplauseWrapper = styled.View`
  height: 300px;
  border-radius: 4px;
  background: ${COLORS.BASE_WHITE};
`

const Title = styled.Text`
  padding: 15px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`

const SubTitle = styled.Text`
  padding: 20px 0;
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  text-align: center;
`

const CloseButtonWrapper = styled.View`
  padding-top: 10px;
  flex-direction: row;
  justify-content: center;
`

const CloseBtn = styled.TouchableOpacity`
  padding: 5px 10px;
  border-radius: 4px;
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-width: 1px;
`

const CloseText = styled.Text`
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  text-align: center;
`