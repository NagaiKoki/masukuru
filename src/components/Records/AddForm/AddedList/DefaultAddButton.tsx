import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign';
// import constants
import { COLORS } from '../../../../constants/Styles';

type Props = {
  onPress: () => void
}

const DefaultAddButton = (props: Props) => {
  const { onPress } = props

  return (
    <Button onPress={onPress}>
      <Icon name="plus" size={25} style={{ color: COLORS.BASE_MUSCLEW, marginRight: 10 }} />
      <ButtonText>トレーニングを追加する</ButtonText>
    </Button>
  )
}

export default DefaultAddButton

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`

const ButtonText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 16px;
  font-weight: bold;
`

