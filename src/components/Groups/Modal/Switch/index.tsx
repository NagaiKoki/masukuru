import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Feather'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import List from './List'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
import { COLORS } from '../../../../constants/Styles'
// import utils
import { handleAlert } from '../../../../utilities/Alert'

type PropsType = {
  isOpen: boolean
  navigation: any
  handleOnClose: () => void
}

const GroupSwitchModal = (props: PropsType) => {
  const { isOpen, navigation, handleOnClose } = props
  const { 
    belongGroups, 
    requestFetchBelongGroups, 
    requestCreateGroup,
  } = useGroupSelector()

  useEffect(() => {
    requestFetchBelongGroups()
  }, [isOpen])

  const handleOnNavigate = () => {
    return navigation.navigate('mainContainer')
  }

  const handleOnCreateGroup = () => {
    handleOnClose()
    handleOnNavigate()
    requestCreateGroup()
  }

  const handleAddGroup = () => {
    const title = 'グループを作成しますか？'
    const subTitle = '※ 所属できるグループは5つまでです。'
    const buttonText = '作成する'
    handleAlert(title, subTitle, buttonText, handleOnCreateGroup)()
  }

  if (!belongGroups.length) {
    return <></>
  }

  return (
    <BottomModal isOpen={isOpen} height={450} onClose={handleOnClose}>
      <Container>
        <Title>所属グループ</Title>
        <List groups={belongGroups} handleOnNavigate={handleOnNavigate} handleOnClose={handleOnClose} />
        <AddNewGroupButton onPress={handleAddGroup} activeOpacity={0.8}>
          <Icon name="plus" size={20} style={{ color: COLORS.BASE_MUSCLEW, marginRight: 5 }}/>
          <AddNewGroupText>新しくグループを作成する</AddNewGroupText>
        </AddNewGroupButton>
      </Container>
    </BottomModal>
  )
}

export default GroupSwitchModal

const Container = styled.View``

const Title = styled.Text`
  padding: 20px 0;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`

const AddNewGroupButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  padding: 10px 15px;
`

const AddNewGroupText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 16px;
  font-weight: bold;
`