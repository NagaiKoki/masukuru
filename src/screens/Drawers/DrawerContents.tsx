import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import { joinInvitedGroup } from '../../apis/invite';
import firebase, { db } from '../../config/firebase';

type DrawerProps = {
  user: firebase.User
  navigation: any
}

const DrawerContent = (props: DrawerProps) => {
  const [showInvitedCodeModal, setShowInvitedCodeModal] = useState<boolean>(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState<boolean>(false)
  const [codeText, setCodeText] = useState<string>('')
  const [ownCode, setOwnCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const { user, navigation } = props;
  const current_user = firebase.auth().currentUser;
  const groupRef = db.collection('groups')

  // TODO ロジックは違うファイルに押し込みたい
  const logout = async () => {
    setIsLoading(true)
    await firebase.auth().signOut().then(() => {
      setIsLoading(false) 
    }).catch(error => {
      console.log(error)
      alert(error)
    })
  };

  if (isLoading) {
    return (
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }
  
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
  const handleInvitedCodeOnClick = () => {
    setShowInvitedCodeModal(true);
  }

  const handleInviteCodeOnClick = () => {
    setShowInviteCodeModal(true)
  }

  // 招待されたグループに移動する
  const replaceGroup = () => {
   joinInvitedGroup(codeText)
   navigation.navigate("ホーム")
   return setShowInvitedCodeModal(false)
  }

  // 招待入力用コードモーダル
  const InvitedCodeModal = () => {
    return (
      <Modal isVisible={showInvitedCodeModal}>
        <InvitedModalView>
          <ModalCloseButton onPress={ () => setShowInvitedCodeModal(false) }>
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

          <InvitedModalSubmitBtn block onPress={replaceGroup} disabled={disableSubmit} disableSubmit={disableSubmit}>
            <InvitedModalSubmitText>送信する</InvitedModalSubmitText>
          </InvitedModalSubmitBtn>
        </InvitedModalView>
    </Modal>
    )
  }

  // 所属するグループの招待コード表示用モーダル
  const InviteCodeModal = () => {
    if (!showInviteCodeModal) return;
    try {
      groupRef.doc(current_user.uid).get().then(doc => {
        if (doc) {
          const { invideCode } = doc.data()
          setOwnCode(invideCode)
        }
      })
    } catch (error) {
      alert('取得に失敗しました。時間を置いてからやり直してください。')
    }
    
    return (
      <Modal isVisible={showInviteCodeModal}>
        <InviteModalView>
          <ModalCloseButton onPress={ () => setShowInviteCodeModal(false) }>
              <Icon name="close" size={30} color={COLORS.BASE_BLACK} />
          </ModalCloseButton>
            <InviteCode>{ownCode}</InviteCode>
            <InviteModalTitle>この招待コードを招待したい友達に教えてあげよう！</InviteModalTitle>
        </InviteModalView>
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
          <DrawerListItemBtn block onPress={ () => { navigation.navigate('マイページ') } }>
            <Icon name="user" size={25} color={COLORS.BASE_BORDER_COLOR}/>
            <DrawerListItemText>マイページ</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <DrawerListItemBtn block onPress={handleInviteCodeOnClick}>
            <Icon name="plus" size={25} color={COLORS.BASE_BORDER_COLOR}/>
            <DrawerListItemText>友達をグループに招待する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <DrawerListItemBtn block onPress={handleInvitedCodeOnClick}>
            <Icon name="envelope-open" size={25} color={COLORS.BASE_BORDER_COLOR}/>
            <DrawerListItemText>招待されたグループに参加する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <DrawerListItemBtn block onPress={ () => logout() }>
            <Icon name="logout" size={25} color={COLORS.BASE_BORDER_COLOR}/>
            <DrawerListItemText>ログアウト</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        {/* 招待コード入力用モーダル */}
        {InvitedCodeModal()}
        {/* 所属しているグループの招待コード表示用モーダル */}
        {InviteCodeModal()}
      </DrawerListContainer>
    </DrawerContainer>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

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
  flex-direction: row;
  align-items: center;
`

const DrawerListItem = styled.View`
  padding: 15px 0;
`

const DrawerListItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-left: 15px;
  font-size: 16px;
`

// 招待コード入力モーダル
const InvitedModalView = styled.View`
  position: absolute;
  bottom: -20;
  width: 110%;
  border-radius: 10px;
  height: 600px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const InviteModalView = styled.View`
  position: absolute;
  bottom: -20;
  width: 110%;
  border-radius: 10px;
  height: 300px;
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

const InviteModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  padding-top: 50px;
  text-align: center;
`

const InviteCode = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  letter-spacing: 4;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
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