import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../constants/Styles'

type GenderType = '男性' | '女性' | 'その他' | ''

type PropsType = {
  selectItem: GenderType
  onClick: (gender: GenderType) => void
}

const SelectGender = (props: PropsType) => {
  const { selectItem, onClick } = props

  const isSelected = (gender: GenderType) => {
    return selectItem === gender
  }

  return (
    <Container>
      <Wrapper>
        <ButtonWrapper>
          <Button onPress={() => onClick('女性')} activeOpacity={1} isSelected={isSelected('女性')}>
            <Icon name="woman" size={30} style={{ color: selectItem === '女性' ? COLORS.BASE_MUSCLEW : COLORS.BASE_BORDER_COLOR }} />
          </Button>
          <ButtonText isSelected={isSelected('女性')}>女性</ButtonText>
        </ButtonWrapper>
          <ButtonWrapper>
            <Button onPress={() => onClick('男性')} activeOpacity={1} isSelected={isSelected('男性')}>
              <Icon name="man" size={30} style={{ color: selectItem === '男性' ? COLORS.BASE_MUSCLEW : COLORS.BASE_BORDER_COLOR }} />
            </Button>
            <ButtonText isSelected={isSelected('男性')}>男性</ButtonText>
          </ButtonWrapper>
        <ButtonWrapper>
          <Button onPress={() => onClick('その他')} activeOpacity={1} isSelected={isSelected('その他')}>
            <Icon name="hearto" size={30} style={{ color: selectItem === 'その他' ? COLORS.BASE_MUSCLEW : COLORS.BASE_BORDER_COLOR }} />
          </Button>
          <ButtonText isSelected={isSelected('その他')}>その他</ButtonText>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  )
}

export default SelectGender

const Container = styled.View`
`

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 240px;
`

const ButtonWrapper = styled.View``

const Button = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px solid ${props => props.isSelected ? COLORS.BASE_MUSCLEW : COLORS.BASE_BORDER_COLOR};
  margin: 10px 15px 5px 0;
  width: 50px;
  height: 50px;
`

const ButtonText = styled.Text<{ isSelected: boolean }>`
  width: 50px;
  height: 50px;
  color: ${props => props.isSelected ? COLORS.BASE_MUSCLEW : COLORS.SUB_BLACK};
  font-size: 14px;
  text-align: center;
`