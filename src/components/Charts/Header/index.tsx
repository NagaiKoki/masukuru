import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'

interface ChartHeaderProps {
  index: number
  setIndex: Dispatch<SetStateAction<number>>
}
 
const ChartHeader = (props: ChartHeaderProps) => {
  const { index, setIndex } = props

  const handleOnSwitch = (labelIndex: number) => {
    return setIndex(labelIndex)
  }

  const isActive = (id: number)  => {
    return index === id
  }

  return (
    <Container>
      <Item active={isActive(0)} onPress={() => handleOnSwitch(0)}>
        <ItemText active={isActive(0)}>歩数計</ItemText>
      </Item>
      <Item active={isActive(1)} onPress={() => handleOnSwitch(1)}>
        <ItemText active={isActive(1)}>体重</ItemText>
      </Item>
    </Container>
  )
}

export default ChartHeader

const Container = styled.View`
  flex-direction: row;
  padding-top: 20px;
  padding-left: 10px;
  background: ${COLORS.BASE_BACKGROUND};
  border-bottom-width: 1;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
`

const Item = styled.TouchableOpacity<{ active: boolean }>`
  width: 80px;
  margin: 0 5px;
  border-bottom-width: ${props => props.active ? 3 : 0};
  border-bottom-color: ${props => props.active ? COLORS.BASE_BLACK : COLORS.BASE_MUSCLEW};
`

const ItemText = styled.Text<{ active: boolean }>`
  padding-bottom: 10px;
  color: ${COLORS.BASE_BLACK};
  font-weight: ${props => props.active ? 'bold' : 300};
  font-size: 18px;
  text-align: center;
`