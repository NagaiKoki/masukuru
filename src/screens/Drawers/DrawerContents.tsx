import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import firebase from 'firebase';

type DrawerProps = {
  user: firebase.User
  navigation: any
}

const DrawerContent = (props: DrawerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [codeText, setCodeText] = useState('')
  const { user, navigation } = props;

  // TODO ロジックは違うファイルに押し込みたい
  const logout = async () => {
    await firebase.auth().signOut().then(function() {
      navigation.navigate('SignoutLoading');
    })
  };


  // ユーザー画像
  const UserImage = (
    user.photoURL ?
        <Image source={{ uri: user.photoURL }}
               style={{ width: 120, height: 120, borderRadius: 60, resizeMode: 'cover', alignSelf: 'center' }}
        />
                  :
        <Image source={require('../../assets/profileDefaultImage.png')}
               style={{ width: 120, height: 100, resizeMode: 'contain', alignSelf: 'center' }}
        />
  );

  // 招待コード送信制御
  const disableSubmit: boolean = (
    codeText && codeText.length === 6 ? false : true
  )

  // モーダル出現
  const handleOnClick = () => {
    setShowModal(true);
  }

  // 招待コードモーダル
  const InvitedCodeModal = () => {
    return (
      <Modal isVisible={showModal}>
        <InvideModalView>
          <ModalCloseButton onPress={ () => setShowModal(false) }>
              <Icon name="close" size={30} color={COLORS.BASE_BLACK} />
          </ModalCloseButton>
          <InvitedModalTitle>招待された6桁の文字を入力しよう！</InvitedModalTitle>

          <InvitedModalFormWrapper>
            <InvitedModalForm 
              placeholder='6桁の招待コード'
              autoCapitalize={'none'}
              autoCorrect={ false }
              onChangeText={ text => setCodeText(text) }
              maxLength={6}
            />
          </InvitedModalFormWrapper>

          <InvitedModalSubmitBtn block onPress={ () => console.log('f') } disabled={disableSubmit} disableSubmit={disableSubmit}>
            <InvitedModalSubmitText>送信する</InvitedModalSubmitText>
          </InvitedModalSubmitBtn>
        </InvideModalView>
    </Modal>
    )
  }

  return (
    <DrawerContainer>
      <DrawerUserContainer>
        <DrawerUserImage>
          {UserImage}
        </DrawerUserImage>
        <DrawerUserName>{user.displayName}</DrawerUserName>
      </DrawerUserContainer>

      <DrawerListContainer>
        <DrawerListItem>
          <Icon name="user" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={ () => { navigation.navigate('Mypage') } }>
            <DrawerListItemText>マイページ</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="plus" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={ () => { navigation.navigate('Mypage') } }>
            <DrawerListItemText>友達をグループに招待する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="envelope-open" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={handleOnClick}>
            <DrawerListItemText>招待されたグループに参加する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="logout" size={25} color={COLORS.BASE_BORDER_COLOR}/>
        
          <DrawerListItemBtn block onPress={ () => logout() }>
            <DrawerListItemText>ログアウト</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        {/* モーダル */}
        {InvitedCodeModal()}
      </DrawerListContainer>
    </DrawerContainer>
  )
}

const DrawerContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  height: 100%;
  width: 100%;
  padding-top: 100px;
  padding-left: 30px;
`

const DrawerUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const DrawerUserName = styled.Text`
  font-size: 20px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  padding-left: 15px;
`

const DrawerUserImage = styled.View`

`

const DrawerListContainer = styled.View`
  padding: 20px 0;
`

const DrawerListItemBtn = styled.TouchableOpacity`

`

const DrawerListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
`

const DrawerListItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-left: 15px;
  font-size: 16px;
`

// 招待コード入力モーダル
const InvideModalView = styled.View`
  position: absolute;
  bottom: -20;
  width: 110%;
  border-radius: 10px;
  height: 600px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const InvitedModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  padding-top: 30px;
  text-align: center;
`

const InvitedModalFormWrapper = styled.View`
  align-self: center;
  margin-top: 30px;
  width: 80%;
`

const InvitedModalForm = styled.TextInput`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  padding: 15px;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE};
  color: ${COLORS.BASE_BLACK};
`

const InvitedModalSubmitBtn = styled.TouchableOpacity<{disableSubmit: boolean }>`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 30px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const InvitedModalSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const ModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 5px 5px 0 0;
`

export default DrawerContent;