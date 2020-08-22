import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import component
import UserImage from '../../../components/Image/userImage'
import InviteCodeModal from '../../../components/InviteModal/invite'
import InvitedCodeModal from '../../../components/InviteModal/invited'
import TranferModal from '../../../components/Groups/transferModal'
import FeedbackModal from '../../../components/Feedback/index'
import SnsInviteCodeShareModal from '../../../components/InviteModal/ShareModal'
import Loading from '../../../components/Loading'
// import apis
import { joinInvitedGroup } from '../../../apis/invite';
import { requestUpdateRecordGroupIds } from '../../../apis/Records'
import { logout } from '../../../apis/auth';
import firebase, { db } from '../../../config/firebase';

type DrawerProps = {
  user: firebase.User
  navigation: any
}

const DrawerContent = (props: DrawerProps) => {
  const [showInvitedCodeModal, setShowInvitedCodeModal] = useState<boolean>(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState<boolean>(false)
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false)
  const [showSnsModal ,setShowSnsModal] = useState(false)
  const [currentGroupId, setCurrentGroupId] = useState('')
  const [codeText, setCodeText] = useState<string>('')
  const [ownCode, setOwnCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const { user, navigation } = props;
  const groupRef = db.collection('groups')

  useEffect(() => {
    db.collectionGroup("groupUsers").where('uid', '==', user.uid).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        if (doc.data().currentGroupId) {
          setCurrentGroupId(doc.data().currentGroupId)
        } else {
          setCurrentGroupId(doc.ref.parent.parent.id);
        }
      });
    })
  }, [])

  if (isLoading) {
    return (
      <Loading size='large' />
    )
  }

  const handleLogout = () => {
    Alert.alert(
      firebase.auth().currentUser.displayName,
      "マスクルからログアウトしてもよろしいですか？",
      [
        {
          text: "キャンセル",
          style: 'cancel'
        },
        {
          text: 'ログアウト',
          onPress: () => requestLogout()
        }
      ],
      { cancelable: false }
    )
  }

  // ログアウト
  const requestLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      logout()
    }, 1000)
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

  // グループ切り替えのモーダル出現
  const handleTransferOnClick = () => {
    setShowTransferModal(true)
  }

  // フィードバックのモーダル出現
  const handleFeedbackOnClick = () => {
    setShowFeedbackModal(true)
  }

  // 招待されたグループに移動する
  const replaceGroup = async () => {
    try {
      const resGroupId = await joinInvitedGroup(codeText, currentGroupId)
      if (!resGroupId) {
        return
      }
      requestUpdateRecordGroupIds(resGroupId)
      setIsLoading(true)
      setTimeout(() => {
       navigation.navigate("mainContainer", { currentGroupId: resGroupId })
       setCurrentGroupId(resGroupId)
       setIsLoading(false)
      }, 2000)
      return setShowInvitedCodeModal(false) 
    } catch (error) {

    }
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
          <DrawerListItemText>グループに招待する</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  // 招待用ナビ
  const renderTransferGroupItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={handleTransferOnClick}>
          <Icon name="people" size={25} color={COLORS.BASE_BORDER_COLOR}/>
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
          <DrawerListItemText>グループに参加する</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  const renderFeedbackItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={handleFeedbackOnClick}>
          <Icon name="question" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>フィードバック</DrawerListItemText>
        </DrawerListItemBtn>
      </DrawerListItem>
    )
  }

  const renderSettingItem = () => {
    return (
      <DrawerListItem>
        <DrawerListItemBtn block onPress={ () => navigation.navigate('setting') }>
          <Icon name="settings" size={25} color={COLORS.BASE_BORDER_COLOR}/>
          <DrawerListItemText>設定</DrawerListItemText>
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
        <UserWrapper>
          <DrawerUserImage>
            <UserImage user={user} width={60} height={60} borderRadius={60} />
          </DrawerUserImage>
          <DrawerUserName>{user.displayName}</DrawerUserName>
        </UserWrapper>
        <GroupBtnWrapper onPress={ () => setShowTransferModal(true) }>
          <Icon name="options" size={20} style={{ marginLeft: 4, marginTop: 2, color: COLORS.BASE_MUSCLEW }} />
        </GroupBtnWrapper>
      </DrawerUserContainer>

      <DrawerListContainer>
        {renderMyPageItem()}
        {renderTransferGroupItem()}
        {renderInvideItem()}
        {renderInvidedItem()}
        {renderFeedbackItem()}
        {renderSettingItem()}
        {renderLogoutItem()}
        {/* グループを切り替えるモーダル */}
        <TranferModal 
          showTransferModal={showTransferModal}
          currentGroupId={currentGroupId}
          setShowTransferModal={setShowTransferModal}
          navigation={navigation}
          setDrawerIsLoading={setIsLoading}
          setCurrentGroupId={setCurrentGroupId}
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
        <InviteCodeModal 
          showInviteCodeModal={showInviteCodeModal} 
          setShowInviteCodeModal={setShowInviteCodeModal} 
          setShowSnsModal={setShowSnsModal}
          ownCode={ownCode}
        />
        <SnsInviteCodeShareModal 
          show={showSnsModal}
          code={ownCode}
          setShowSnsInviteModal={setShowSnsModal}
        />
        <FeedbackModal 
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
        />
      </DrawerListContainer>
    </DrawerContainer>
  )
}

const DrawerContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  height: 100%;
  width: 100%;
  padding-top: 70px;
  padding-left: 30px;
`

const DrawerUserContainer = styled.View`
  width: 95%;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 auto;
`

const UserWrapper = styled.View`
`

const GroupBtnWrapper = styled.TouchableOpacity`
  margin-right: 10px;
  border-width: 1px;
  height: 30px;
  width: 30px;
  border-radius: 60px;
  flex-direction: row;
  align-items: center;
  border-color: ${COLORS.BASE_MUSCLEW};

`

const DrawerUserName = styled.Text`
  font-size: 18px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  margin-top: 10px;
`

const DrawerUserImage = styled.View`
`

const DrawerListContainer = styled.View`
  padding-top: 20px;
`

const DrawerListItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const DrawerListItem = styled.View`
  padding: 10px 0;
`

const DrawerListItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-left: 15px;
  font-size: 16px;
`

export default DrawerContent;