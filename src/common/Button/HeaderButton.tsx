import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'

type Props = {
  text: string
  onPress: () => void
}

const HeaderButton = (props: Props) => {
  const { text, onPress } = props

  return (
    <Button onPress={onPress} activeOpacity={0.8}>
      <Text>{text}</Text>
    </Button>
  )
}

export default HeaderButton

const Button = styled.TouchableOpacity`
`

const Text = styled.Text`
  margin-right: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_WHITE};
`