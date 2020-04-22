import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, View, Button, Alert } from 'react-native'
import { COLORS } from '../../constants/Styles';
import MenuList from './menuList'
import MenuAddModal from './menuAddModal';
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';
import CheerModal from './cheerModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const MunuScreen = ({ navigation, route }) => {
  const [list, setList] = useState<MenuType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false)
  const { params } = route;
  const { currentGroupId, item, ownerId } = params;
  const user = firebase.auth().currentUser
  const itemName = item.name;
  const currentUserMenuLength = list.filter(l => l.uid === user.uid).length

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        ownerId == user.uid ? <Icon name="trash-o" size={24} onPress={() => { eventdeletealert() }} style={{ paddingRight: 20, color: COLORS.SUB_BLACK }}/> : null
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
    db.collection('groups').doc(currentGroupId).collection('events').where('name', '==', item.name)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.docs[0].ref.delete()
    }).then(function() {
      navigation.navigate("main")
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    })
  }
  
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