import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'

interface SuggestItemProps {
  name: string
}

const SuggestItem = (props: SuggestItemProps) => {
  const { name } = props

  return (
    <ItemWrapper>
      <ItemName>{name}</ItemName>
    </ItemWrapper>
  )
}

export default SuggestItem

const ItemWrapper = styled.View`
  padding: 7px 25px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
`

const ItemName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
`