import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  title: string
  stepCount: number
}

const StepTitle = (props: PropsType) => {
  const { stepCount, title } = props

  const renderStep = 
    <SubTitle>{ stepCount === 4 ?  `-- 最後のステップです！ --` : `-- ステップ${stepCount} --` }</SubTitle>

  return (
    <Wrapper>
      <Title>{title}</Title>
      <SubTitle>{renderStep}</SubTitle>
    </Wrapper>
  )
}

export default StepTitle

const Wrapper = styled.View``

const Title = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const SubTitle = styled.Text`
  margin-top: 10px;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
  text-align: center;
`