import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import MenuList from './menuList'
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';

const MunuScreen = ({ navigation, route }) => {
  const [list, setList] = useState<MenuType[]>([]);
  const { params } = route;
  const { currentGroupId, item } = params;
  const user = firebase.auth().currentUser
  
  
  return (
    <MenuContainer>
      <MenuTitleView>
        <MenuTitle>{item.name}</MenuTitle>
      </MenuTitleView>

      <MenuListContainer>
        <MenuListTitle>メンバーの記録</MenuListTitle>
        <MenuList item={item} list={list} setList={setList} user={user} currentGroupId={currentGroupId} navigation={navigation}/>
      </MenuListContainer>
    </MenuContainer>
  )
}

const MenuContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  flex: 1;
`

const MenuTitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`

const MenuTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  font-weight: bold;
  /* text-align: center; */
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
`

const MenuAddButton = styled.TouchableOpacity`
  background-color: ${COLORS.BASE_MUSCLEW};
  width: 80%;
  align-self: center;
  padding: 15px 0;
  border-radius: 30px;
  margin-top: 40px;
`

const MenuAddText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
`

// menu list
const MenuListContainer = styled.View`
`

const MenuListTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
  width: 80%;
  align-self: center;
  padding: 60px 0 20px 0;
`

export default MunuScreen;