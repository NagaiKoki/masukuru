import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, View, Button, Alert } from 'react-native'
import { COLORS } from '../../../constants/Styles';
import MenuList from './menuList'
import MenuAddModal from './menuAddModal';
import MenuTitleUpdate from './menuTitleUpdate'
import firebase, { db } from '../../../config/firebase';
import { MenuType } from '../../../types/menu';
import CheerModal from './cheerModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const MunuScreen = ({ navigation, route }) => {
  const [list, setList] = useState<MenuType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false)
  const { params } = route;
  const { currentGroupId, item, currentUser } = params;
  const user = firebase.auth().currentUser
  const [itemName, setItemName] = useState(item.name)
  const currentUserMenuLength = list.filter(l => l.uid === user.uid).length

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        item.uid == currentUser.uid ? <Icon name="trash-o" size={24} onPress={() => { eventdeletealert() }} style={{ paddingRight: 20, color: COLORS.SUB_BLACK }}/> : null
      ),
    });
  }, [navigation]);

  const eventdeletealert = () => 
    Alert.alert(
      "このトレーニングを削除します。",
      "本当によろしいですか？",
      [
        {
          text: "Cansel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => { deleteEvent() }
        }
      ],
      { cancelable: false }
    )

  const deleteEvent = () => {
    db.collection('users').doc(currentUser.uid).collection('events').where('name', '==', item.name)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.docs[0].ref.delete()
    }).then(function() {
      navigation.navigate("マイページ")
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    })
  }
  
  return (
    <MenuContainer>
      <MenuTitleView>
        <MenuTitle>{itemName}</MenuTitle> 
        <MenuTitleUpdate user={currentUser} currentGroupId={currentGroupId} item={item} itemName={itemName} setItemName={setItemName}/>
      </MenuTitleView>
      <MenuAddButton block onPress={setIsVisible}>
        <MenuAddText>記録を追加する</MenuAddText>
      </MenuAddButton>
      {/* モーダル */}
      <MenuAddModal user={currentUser} item={item} currentUserMenuLength={currentUserMenuLength} setMessageVisible={setMessageVisible} setList={setList} isVisible={isVisible} setIsVisible={setIsVisible} />
      <CheerModal messageVisible={messageVisible} setMessageVisible={setMessageVisible} itemName={itemName} itemLength={currentUserMenuLength} />

      <MenuListContainer>
        <MenuList item={item} list={list} setList={setList} user={currentUser} currentGroupId={currentGroupId} navigation={navigation}/>
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
  align-self: center;
  width: 90%;
`

const MenuTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  font-weight: bold;
  width: 85%;
  text-align: center;
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
  margin-top: 20px;
`
export default MunuScreen;