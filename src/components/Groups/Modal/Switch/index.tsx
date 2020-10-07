import React, { useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Feather'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import List from './List'
import Loading from '../../../Loading'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
import { COLORS } from '../../../../constants/Styles'
// import utils
import { lazyFunction } from '../../../../utilities/Function/lazyFunction'

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
    currentGroupId
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

  if (!belongGroups.length) {
    return <></>
  }

  return (
    <BottomModal isOpen={isOpen} onClose={handleOnClose}>
      <Container>
        <Title>所属グループ</Title>
        <List groups={belongGroups} currentGroupId={currentGroupId} />
        <AddNewGroupButton onPress={handleOnCreateGroup}>
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
  padding: 10px 15px;
`

const AddNewGroupText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 16px;
`