import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MenuItem from './menuCategoryItem';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase'
import { MenuType } from '../../types/menu';
import { requestCategroyMenuList } from '../../apis/Menus/categoryMenuList';

interface TrainingListProps {
  user?: firebase.User
  currentGroupId?: string
  list: MenuType[]
  setList: Dispatch<SetStateAction<MenuType[]>>
  item: any
  navigation: any
}

const MenuList = (props: TrainingListProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const { list, setList, currentGroupId, item, navigation }  = props;

  const getMenuList = async () => {
    const menuList = await requestCategroyMenuList(currentGroupId, item)
    setList(menuList)
    setIsLoading(false)
  }

  useEffect(() => {
    getMenuList()
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
      <MenuItem key={index} index={index} list={item} navigation={navigation}/>  
  ))

  // スクロールリロード
  const onRefresh = async () => {
    setIsRefresh(true)
    getMenuList()
    setIsRefresh(false)
  }

  return (
    (
      list.length ? 
      <ScrollView　
        contentContainerStyle={{ paddingBottom: 200 }}
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
      : <MenuNoDataText>記録はありません。{"\n"}{"\n"}まずは気軽なトレーニングから始めてみませんか？</MenuNoDataText>
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
  width: 95%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
`

const LoadingContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
`

const MenuNoDataText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  padding: 40px 0;
  align-self: center;
  text-align: center;
`

export default MenuList;