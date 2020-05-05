import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import MenuList from './menuCategoryList'
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';

const MunuScreen = ({ navigation, route }) => {
  const [list, setList] = useState<MenuType[]>([]);
  const { params } = route;
  const { currentGroupId, item } = params;
  const user = firebase.auth().currentUser
  
  
  return (
    <MenuContainer>
      <MenuListContainer>
        <MenuListTitle>みんなの記録</MenuListTitle>
        <MenuList item={item} list={list} setList={setList} user={user} currentGroupId={currentGroupId} navigation={navigation}/>
      </MenuListContainer>
    </MenuContainer>
  )
}

const MenuContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  flex: 1;
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
  padding: 40px 0 10px 0;
`

export default MunuScreen;