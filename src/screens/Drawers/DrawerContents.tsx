import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { ActivityIndicator, Clipboard, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import UserImage from '../../components/Image/userImage'
import { joinInvitedGroup } from '../../apis/invite';
import firebase, { db } from '../../config/firebase';

type DrawerProps = {
  user: firebase.User
  navigation: any
}

const DrawerContent = (props: DrawerProps) => {
  const [showInvitedCodeModal, setShowInvitedCodeModal] = useState<boolean>(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState<boolean>(false)
  const [currentGroupId, setCurrentGroupId] = useState('')
  const [codeText, setCodeText] = useState<string>('')
  const [ownCode, setOwnCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isHost, setIsHost] = useState(false)
  const { user, navigation } = props;
  const current_user = firebase.auth().currentUser;
  const groupRef = db.collection('groups')

  useEffect(() => {
    db.collectionGroup("groupUsers").where('uid', '==', user.uid).limit(1).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        setCurrentGroupId(doc.ref.parent.parent.id);
        // 自分がホストではない場合の状態管理
        doc.ref.parent.parent.id === user.uid ? setIsHost(true) : setIsHost(false)
      });
    })
  }, [])

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
  
  // 招待コード送信制御
  const disableSubmit: boolean = (
    codeText && codeText.length === 6 ? false : true
  )

  // 招待された場合のモーダル出現
  const handleInvitedCodeOnClick = () => {
    setShowInvitedCodeModal(true);
  }

  // 招待をする場合のモーダル出現
  const handleInviteCodeOnClick = () => {
    try {
      groupRef.doc(currentGroupId).get().then(doc => {
        if (doc) {
          const { inviteCode } = doc.data()
          setOwnCode(inviteCode)
        }
      })
    } catch (error) {
      Alert.alert('取得に失敗しました。時間を置いてからやり直してください。')
    }
    setShowInviteCodeModal(true)
  }

  // 招待されたグループに移動する
  const replaceGroup = () => {
   joinInvitedGroup(codeText)
   navigation.navigate("ホーム")
   return setShowInvitedCodeModal(false)
  }

  const copyInviteCode = (code) => {
    Clipboard.setString(code)
    Alert.alert('コピーされました！')
  }

  // 招待入力用コードモーダル
  const InvitedCodeModal = () => {
    return (
      <Modal isVisible={showInvitedCodeModal} swipeDirection='down' onSwipeComplete={() => setShowInvitedCodeModal(false)}>
        <InvitedModalView>
          <InviteCloseBar />
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
    return (
      <Modal isVisible={showInviteCodeModal} swipeDirection='down' onSwipeComplete={() => setShowInviteCodeModal(false)}>
        <InviteModalView>
          <InviteCloseBar />
          <InviteCodeWrapper onPress={() => copyInviteCode(ownCode)}>
            <InviteCodeText>{ownCode}</InviteCodeText>
          </InviteCodeWrapper>
          <InviteSubText>タップするとコピーされます</InviteSubText>
          <InviteModalTitle>この招待コードを招待したい友達に教えてあげよう！</InviteModalTitle>
          <InviteSubText>※ グループに参加できる人数は最大で5人までです</InviteSubText>
       </InviteModalView>
    </Modal>
    )
  }

  // マイページ
  const renderMyPageItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={ () => { navigation.navigate('マイページ') } }>
          <Icon name="user" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>マイページ</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  // 招待用ナビ
  const renderInvideItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={handleInviteCodeOnClick}>
          <Icon name="plus" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>友達をグループに招待する</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  // 招待された場合用ナビ
  const renderInvidedItem = () => {
    if (!isHost) return;
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={handleInvitedCodeOnClick}>
          <Icon name="envelope-open" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>招待されたグループに参加する</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  // ログアウト
  const renderLogoutItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={ () => logout() }>
          <Icon name="logout" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>ログアウト</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  return (
    <DrawerContainer>
      <DrawerUserContainer>
        <DrawerUserImage>
          <UserImage user={user} width={100} height={100} borderRadius={60} />
        </DrawerUserImage>
        <DrawerUserName>{user.displayName}</DrawerUserName>
      </DrawerUserContainer>

      <DrawerListContainer>
        {renderMyPageItem()}
        {renderInvideItem()}
        {renderInvidedItem()}
        {renderLogoutItem()}
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
  padding-left: 10px;
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
  height: 320px;
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
  font-weight: bold;
  padding-top: 50px;
  text-align: center;
`

const InviteCodeWrapper = styled.TouchableOpacity`
  align-items: center;
  width: 80%;
  margin: 0 auto;
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  border-radius: 5px;
  margin-top: 30px;
`

const InviteCodeText = styled.Text`
  padding: 10px 50px;
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  letter-spacing: 4;
  font-weight: bold;
  text-align: center;
`

const InviteSubText = styled.Text`
  width: 80%;
  margin: 0 auto;
  margin-top: 8px;
  text-align: center;
  color: ${COLORS.SUB_BLACK};
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
  border-radius: 60px;
  margin-top: 30px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const InvitedModalSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const InviteCloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

export default DrawerContent;