import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, View } from 'react-native'
import { COLORS } from '../../constants/Styles';
import MenuList from './menuList'
import MenuAddModal from './menuAddModal';
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';
import CheerModal from './cheerModal';

const MunuScreen = ({ navigation, route }) => {
  const [list, setList] = useState<MenuType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false)
  const { params } = route;
  const { currentGroupId, item } = params;
  const user = firebase.auth().currentUser
  const itemName = item.name;
  const currentUserMenuLength = list.filter(l => l.uid === user.uid).length

  return (
    <MenuContainer>
      <MenuTitle>{item.name}</MenuTitle>
      <MenuAddButton block onPress={setIsVisible}>
        <MenuAddText>記録を追加する</MenuAddText>
      </MenuAddButton>
      {/* モーダル */}
      <MenuAddModal item={item} currentUserMenuLength={currentUserMenuLength} setMessageVisible={setMessageVisible} setList={setList} currentGroupId={currentGroupId} isVisible={isVisible} setIsVisible={setIsVisible} />
      <CheerModal messageVisible={messageVisible} setMessageVisible={setMessageVisible} itemName={itemName} itemLength={currentUserMenuLength} />

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

const MenuTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
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