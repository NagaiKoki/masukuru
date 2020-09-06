import React, { SetStateAction, Dispatch } from 'react'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'

interface SettingModalProps {
  recordId: string
  visibleModal: boolean
  navigation: any
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  deleteRecordWithAlert: () => void
}

const SettingModal = (props: SettingModalProps) => {
  const { recordId, visibleModal, navigation, setVisibleModal, deleteRecordWithAlert } = props
  
  const handleNavigateEdit = () => {
    setVisibleModal(false)
    navigation.navigate('recordEditModal', { recordId: recordId } )
  }

  const handleOnDelete = () => {
    deleteRecordWithAlert()
  }

  return (
    <Modal isVisible={visibleModal} swipeDirection='down' onSwipeComplete={ () => setVisibleModal(false) }>
      <Container>
        <CloseBar />
        <List>
          <ItemWrapper activeOpacity={1} onPress={handleNavigateEdit} >
            <Icon name="edit" size={20} style={{ color: COLORS.BASE_BLACK }} />
            <ItemText>投稿を編集する</ItemText>
          </ItemWrapper>
          <ItemWrapper activeOpacity={1} onPress={handleOnDelete}>
            <Icon name="trash-o" size={25} style={{ color: COLORS.DANGER_COLOR }} />
            <ItemText color={COLORS.DANGER_COLOR}>投稿を削除する</ItemText>
          </ItemWrapper>
        </List>
      </Container>
    </Modal>
  )
}

export default SettingModal

const Container = styled.View`
  position: absolute;
  align-self: center;
  bottom: -20px;
  border-radius: 10px;
  height: 180px;
  width: 110%;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const CloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

const List = styled.View`
  margin-top: 30px;
`

const ItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3;
  margin-top: 10px;
  padding: 15px 10px 0px 30px;
`

const ItemText = styled.Text<{ color?: string }>`
  font-size: 18px;
  color: ${props => props.color ? props.color : COLORS.BASE_BLACK};
  margin-left: 15px;
`