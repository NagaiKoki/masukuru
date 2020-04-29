import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { ActivityIndicator, Clipboard, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import component
import UserImage from '../../components/Image/userImage'
import InviteCodeModal from '../../components/InviteModal/invite'
import InvitedCodeModal from '../../components/InviteModal/invited'
import TranferModal from '../../components/Groups/transferModal'
import Loading from '../../components/Loading'
// import apis
import { joinInvitedGroup } from '../../apis/invite';
import { logout } from '../../apis/auth';
import firebase, { db } from '../../config/firebase';

type DrawerProps = {
  user: firebase.User
  navigation: any
}

const DrawerContent = (props: DrawerProps) => {
  const [showInvitedCodeModal, setShowInvitedCodeModal] = useState<boolean>(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState<boolean>(false)
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false)
  const [currentGroupId, setCurrentGroupId] = useState('')
  const [codeText, setCodeText] = useState<string>('')
  const [ownCode, setOwnCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isHost, setIsHost] = useState(false)
  const { user, navigation } = props;
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

  if (isLoading) {
    return (
      <Loading size='large' />
    )
  }

  // ログアウト
  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      logout()
    }, 1500)
  }
  
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

  const handleTransferOnClick = () => {
    setShowTransferModal(true)
  }

  // 招待されたグループに移動する
  const replaceGroup = async () => {
   const resGroupId = await joinInvitedGroup(codeText)
   setIsLoading(true)
   setTimeout(() => {
    navigation.navigate("main", { currentGroupId: resGroupId })
    setIsLoading(false)
   }, 2000)
   return setShowInvitedCodeModal(false)
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

  // 招待用ナビ
  const renderTransferGroupItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={handleTransferOnClick}>
          <Icon name="plus" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>グループを切り替える</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  // 招待された場合用ナビ
  const renderInvidedItem = () => {
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
        <DrawerListItemBtn block onPress={ () => handleLogout() }>
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
        {renderTransferGroupItem()}
        {renderInvideItem()}
        {renderInvidedItem()}
        {renderLogoutItem()}
        {/* グループを切り替えるモーダル */}
        <TranferModal 
          showTransferModal={showTransferModal}
          currentGroupId={currentGroupId}
        />
        {/* 招待コード入力用モーダル */}
        <InvitedCodeModal 
          showInvitedCodeModal={showInvitedCodeModal}
          setShowInvitedCodeModal={setShowInvitedCodeModal}
          setCodeText={setCodeText}
          replaceGroup={replaceGroup}
          codeText={codeText}
        />
        {/* 所属しているグループの招待コード表示用モーダル */}
        <InviteCodeModal showInviteCodeModal={showInviteCodeModal} setShowInviteCodeModal={setShowInviteCodeModal} ownCode={ownCode}/>
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
  padding: 0 10px;
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