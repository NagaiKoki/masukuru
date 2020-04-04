import React, { useState, useEffect } from 'react';
import { requestTrrainingList } from '../../apis/myPageTraining';
import TrainingItem from './trainingItem';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase'

interface TrainingListProps {
  user: firebase.User
}

const TrainingList = (props: TrainingListProps) => {
  const [list, setList] = useState([]);
  const { user }  = props;

  useEffect(() => {
    requestTrrainingList(user, setList)
  }, [])

  if (!list.length) {
    return (
      <TrainingListContainer>
        <TrainingNondataText></TrainingNondataText>
      </TrainingListContainer>
    )
  }
  
  // 各トレーニングのデータ
  const TrainingMenuItem = 
    list.map((item) => (
      <TrainingItem list={item} />
  ))

  return (
    <TrainingListContainer>
      {TrainingMenuItem}
    </TrainingListContainer>
  )
}

const TrainingListContainer = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  align-self: center;
  width: 90%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
`

const TrainingNondataText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 20px;
`


export default TrainingList;