import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { requestMenuList } from '../../apis/requestMenuList';
import MenuItem from './menuItem';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase'
import { MenuType } from '../../types/menu';

interface TrainingListProps {
  user: firebase.User
}

const MenuList = (props: TrainingListProps) => {
  const [list, setList] = useState<MenuType[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const { user }  = props;

  useEffect(() => {
    requestMenuList(setList, setIsLoading, user)
  }, [])

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='small' style={[ styles.loading ]} />
      </LoadingContainer>
    )
  }
  
  // 各トレーニングのデータ
  const TrainingMenuItem = 
    list.map((item, index) => (
      <MenuItem key={index} index={index} list={item}/>  
  ))

  const onRefresh = async () => {
    setIsRefresh(true)
    await requestMenuList(setList, setIsLoading, user)
    setIsRefresh(false)
  }

  return (
    (
      list.length ? 
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={isRefresh}
            onRefresh={onRefresh}
          />
        }
      >
        <TrainingListContainer>
          {TrainingMenuItem}
        </TrainingListContainer>
      </ScrollView> 
      : 
      <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={isRefresh}
          onRefresh={onRefresh}
        />
      } >
      <MenuNoDataText>記録はありません。{"\n"}{"\n"}まずは気軽なトレーニングから始めてみませんか？</MenuNoDataText>
      </ScrollView> 
    )
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND,
    paddingTop: 10
  }
})

const TrainingListContainer = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  align-self: center;
  width: 90%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
`

const LoadingContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
`

const MenuNextBtn = styled.TouchableOpacity` 
`

const MenuBtnText = styled.Text`
  color: ${COLORS.BASE_BLACK};
`

const MenuBackBtn = styled.TouchableOpacity`
`

const MenuNoDataText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  padding: 40px 0;
  align-self: center;
  text-align: center;
`


export default MenuList;