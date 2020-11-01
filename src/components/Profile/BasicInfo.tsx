import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'
// import selectors
import { useSelectWeightGoal, useSelectWeights } from '../../selectors/chart'
// import types
import { UserType } from '../../types/User'

type Props = {
  user: UserType
}

const ProfileBasicInfo = (props: Props) => {
  const { user } = props
  const { visibleWeight } = user
  const weightGoal = useSelectWeightGoal()
  const weights = useSelectWeights()
  const weight = weights[0]

  return (
    <Wrapper>
      <LabelWrapper>
        <Label>目標体重</Label>
        <Text>{weightGoal ? `${weightGoal}kg` : '未設定'}</Text>
      </LabelWrapper>
      <LabelWrapper>
        <Label>直近の体重</Label>
        <Text>{weight ? `${weight.weight}kg` : '未入力'}</Text>
        { !visibleWeight ? <Batch>非公開</Batch> : null }
      </LabelWrapper>
    </Wrapper>
  )
}

export default ProfileBasicInfo

const Wrapper = styled.View`
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
  margin-top: 20px;
  padding-top: 10px;
`

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

const Label = styled.Text`
  margin-right: 5px;
  font-weight: bold;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const Text = styled.Text`
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const Batch = styled.Text`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  border-radius: 4px;
  margin-left: 10px;
  padding: 2px 5px;
  color: ${COLORS.SUB_BLACK};
  background-color: ${COLORS.SUB_BACKGROUND};
  font-size: 10px;
`

