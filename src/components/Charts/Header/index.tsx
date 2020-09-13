import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
// import screen
import WeightChart from '../WeightChart'
import FatChart from '../FatChart'
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
        <ItemText active={isActive(0)}>体重</ItemText>
      </Item>
      <Item active={isActive(1)} onPress={() => handleOnSwitch(1)}>
        <ItemText active={isActive(1)}>体脂肪率</ItemText>
      </Item>
    </Container>
  )
}

export default ChartHeader

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
  background: ${COLORS.BASE_MUSCLEW};
`

const Item = styled.TouchableOpacity<{ active: boolean }>`
  width: 80px;
  border-bottom-width: ${props => props.active ? 5 : 0};
  border-bottom-color: ${props => props.active ? COLORS.BASE_WHITE : COLORS.BASE_MUSCLEW};
`

const ItemText = styled.Text<{ active: boolean }>`
  padding-bottom: 15px;
  color: ${COLORS.BASE_WHITE};
  font-weight: ${props => props.active ? 'bold' : 300};
  font-size: 18px;
  text-align: center;
`