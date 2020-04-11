import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, Button } from 'react-native';
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
  const [previousItem, setPreviousItem] = useState<MenuType[]>([])
  const [isLastMenu, setIsLastMenu] = useState(false)
  const [isFirstMenu, setIsFirstMenu] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { user }  = props;
  
  useEffect(() => {
    requestMenuList(setList, user)
    setIsLoading(false)
  }, [])

  // const handleBack = () => {
  //   setPreviousItem(list)
  //   setList(previousItem);
  //   setIsLastMenu(false)
  // }

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
      <MenuItem key={index} list={item}/>  
  ))

  // // 戻るボダン
  // const backBtn = () => {
  //   if (previousItem.length) {
  //     return (
  //       <MenuBackBtn block onPress={() => handleBack()} >
  //         <MenuBtnText>戻る</MenuBtnText>
  //       </MenuBackBtn>
  //     )
  //   } else {
  //     return <MenuBtnText></MenuBtnText>;
  //   }
  // }

  // // 次へボタン
  // const nextBtn = () => {
  //   if (isLastMenu) return;
  //   return (
  //     <MenuNextBtn block onPress={ () => requestMenuList(user, setList, setIsLastMenu, setIsFirstMenu, setPreviousItem, list, 'next')}>
  //       <MenuBtnText >次へ</MenuBtnText>
  //     </MenuNextBtn>
  //   )
  // }

  return (
    (
      list.length ? <ScrollView>
      {/* {backBtn()}
      {nextBtn()} */}
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