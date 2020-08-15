import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign';
// import constants
import { COLORS } from '../../../constants/Styles'

interface UnitFormProps {
  handleAddSet: () => void
  handleDeleteSet: () => void
}

const MusclewSetBtn = (props: UnitFormProps) => {
  const { handleAddSet, handleDeleteSet } = props

  return (
    <AddSetWrapper>
      <AddSetText>セット数</AddSetText>
      <AddSetBtn onPress={handleAddSet}>
        <Icon name="plus" size={20} style={{ color: COLORS.SUB_BLACK, marginRight: 10 }} />
      </AddSetBtn>
      <AddSetBtn onPress={handleDeleteSet}>
        <Icon name="minus" size={20} style={{ color: COLORS.SUB_BLACK }} />
      </AddSetBtn>
    </AddSetWrapper>
  )
}

const AddSetWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`

const AddSetText = styled.Text`
  margin-right: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const AddSetBtn = styled.TouchableOpacity``

export default MusclewSetBtn