import React, { useState, } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import firebase, { db } from '../../../config/firebase';

interface MenuTitleUpdateProps {
  item: any
  currentGroupId?: string
  itemName: any;
  setItemName: any;
  ownerId: any;
}

const MenuTitleUpdate = (props: MenuTitleUpdateProps) => {
  const [updateModal, setUpdateModal] = useState(false);
  const { currentGroupId, item, itemName, setItemName, ownerId} = props;
  const currentItemName = item.name
  const user = firebase.auth().currentUser

  const updateTitle = () => {
    db.collection('groups').doc(currentGroupId).collection('events').where('name', '==', currentItemName)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.docs[0].ref.update({
        name: itemName
      })
    }).then(() => {
      db.collectionGroup('menus').where('groupId', '==', currentGroupId).where('name', '==', currentItemName )
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            name: itemName
          })
        });
      });
    }).then(function() {
      setUpdateModal(false)
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    })
  }



  return (
    ownerId === user.uid?
    <MenuTitleUpdateView>
      <SimpleLineIcons name='pencil' size={24} onPress={() => setUpdateModal(true)} style={{ color: COLORS.SUB_BLACK, position: 'absolute', alignSelf: 'flex-end', marginTop: 55, paddingRight: 40 }}/>

      <Modal isVisible={updateModal} >
        <ModalView>
          <ModalCloseButton>
            <Icon name="close"  size={24} onPress={() => setUpdateModal(false)} style={{ color: COLORS.SUB_BLACK }}/>
          </ModalCloseButton>
          <ModalTitle>
            トレーニング名の編集
          </ModalTitle>
          <UpdateForm
            placeholder={itemName}
            placeholderTextColor={'#000'}
            autoCapitalize={'none'}
            autoCorrect={ false }
            onChangeText={ text => setItemName(text) }
          />
          <SubText>※ 4文字以上</SubText>
          <UpdateButton>
            <UpdateText onPress={ () => updateTitle()}>
              送信する
            </UpdateText>
          </UpdateButton>
        </ModalView>
      </Modal>
    </MenuTitleUpdateView>
    :
    null
  )
}

const MenuTitleUpdateView = styled.View`
`

const ModalView = styled.View`
  height: 320px;
  border-radius: 10px;
  background-color: #fff;
`

const ModalCloseButton = styled.View`
  align-self: flex-end;
  padding: 10px;
`

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const UpdateForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 80%;
  align-self: center;
  border-radius: 5px;
  padding: 20px 15px;
  color: ${COLORS.BASE_BLACK};
  margin: 40px 0 10px 0;
`

const SubText = styled.Text`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 30px;
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
`

const UpdateButton = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 10px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const UpdateText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`

export default MenuTitleUpdate;
