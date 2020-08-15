import React from 'react'
import styled from 'styled-components'
import { Keyboard } from 'react-native'
// import constants
import { COLORS } from '../../../constants/Styles'

interface SuggestItemProps {
  name: string
  handleOnChange: (keyword: string) => void
}

const SuggestItem = (props: SuggestItemProps) => {
  const { name, handleOnChange } = props

  const handleOnClick = () => {
    handleOnChange(name)
    Keyboard.dismiss()
  }

  return (
    <ItemWrapper>
      <ItemNameWrapper onPress={handleOnClick}>
        <ItemName>
          {name}
        </ItemName>
      </ItemNameWrapper>
    </ItemWrapper>
  )
}

export default SuggestItem

const ItemWrapper = styled.View`
  padding: 7px 25px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
`

const ItemNameWrapper = styled.TouchableOpacity`
`

const ItemName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  font-weight: bold;
`