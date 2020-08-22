import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { FirestoreTimestamp } from '../../../types/Record'
// import utils
import { convertTimeStampToStringOnlyDate } from '../../../utilities/timestamp'

interface TrainingDateProps {
  date: FirestoreTimestamp | null
  createdAt: FirestoreTimestamp
  hasWord?: boolean
}

const TrainingDate = (props: TrainingDateProps) => {
  const { date, createdAt, hasWord } = props
  const trainingDate = date ? date : createdAt

  return (
    <TrainingDateWrapper hasWord={hasWord}>
      <DateTitle>トレーニング日</DateTitle>
      <DateText>{convertTimeStampToStringOnlyDate(trainingDate)}</DateText>
    </TrainingDateWrapper>
  )
}

const TrainingDateWrapper = styled.View<{ hasWord?: boolean }>`
  border-top-color: ${props => props.hasWord ? COLORS.BASE_BORDER_COLOR : 'transparent'};
  border-top-width: ${props => props.hasWord ? '0.3px' : 0};
  padding: 15px 0 20px 0;
  margin-left: 50px;
`

const DateTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 10px;
`

const DateText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
`

export default TrainingDate