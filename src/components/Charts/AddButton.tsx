import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../constants/Styles'

interface AddWeightButton {
  navigation: any
}

const AddWeightButton = (props: AddWeightButton) => {
  const { navigation } = props

  const handleOnNavigation = () => {
    return navigation.navigate('addWeight')
  }

  return (
    <RecordAddBtn onPress={handleOnNavigation} >
      <Icon name="plus" size={25} style={{ color: COLORS.BASE_WHITE, marginTop: 3 }}  />
    </RecordAddBtn>
  )
}

export default AddWeightButton

const RecordAddBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  bottom: 7%;
  right: 5%;
  box-shadow: 10px 5px 5px ${COLORS.FORM_BACKGROUND};
`