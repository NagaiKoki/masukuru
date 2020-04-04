import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { requestTrrainingList } from '../../apis/myPageTraining';
import TrainingItem from './trainingItem';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase'
import { MenuType } from '../../types/menu';

interface TrainingListProps {
  user: firebase.User
}

const TrainingList = (props: TrainingListProps) => {
  const [list, setList] = useState<MenuType[]>([]);
  const { user }  = props;

  useEffect(() => {
    requestTrrainingList(user, setList)
  }, [])

  if (!list.length) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='small' style={[ styles.loading ]} />
      </LoadingContainer>
    )
  }
  
  // 各トレーニングのデータ
  const TrainingMenuItem = 
    list.map((item: MenuType, key: number) => (
      <TrainingItem key={key} list={item}/>
  ))

  return (
    <ScrollView>
      <TrainingListContainer>
      {TrainingMenuItem}
    </TrainingListContainer>
    </ScrollView>
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND,
    paddingTop: 10
  }
})

const LoadingContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND}
`


export default TrainingList;