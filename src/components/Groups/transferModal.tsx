import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Alert } from 'react-native'
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/Styles';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
// import component
import Loading from '../Loading'
import { UnSettingGroupImage, GroupImage } from '../Image/groupImage';
// import apis
import { requestBelongGroups, requestTransfer } from '../../apis/Groups/transfer'
// import lib
import truncateText from '../../lib/truncateText'
import { isDeveloper } from '../../lib/checkDeveloper'
// import apis
import { createGroup } from '../../apis/Groups/create'
import firebase, { db } from '../../config/firebase';
// import constanst
import { INVITE_ERROR_MESSAGE } from '../../constants/errorMessage';

interface TransferModalProps {
  showTransferModal: boolean
  currentGroupId: string
  setShowTransferModal: Dispatch<SetStateAction<boolean>>
  navigation: any
  setDrawerIsLoading: Dispatch<SetStateAction<boolean>>
  setCurrentGroupId: Dispatch<SetStateAction<string>>
}

type responseGroupType = {
  inviteCode: string
  name: string
  imageUrl: string
  groupName: string
  id: string
  ownerId: string
  users: Users[]
}

type Users = {
  imageUrl: string
  name: string
  uid: string
}

const TranferModal = (props: TransferModalProps) => {
  const [isloading, setIsloading] = useState(false)
  const [host, setHost] = useState(false)
  const [groups, setGroups] = useState<responseGroupType[]>([])
  const { showTransferModal, 
          currentGroupId, 
          setShowTransferModal, 
          navigation, 
          setDrawerIsLoading,
          setCurrentGroupId } = props 

  useEffect(() => {
    getBelongGroups()
    verifyGroupBtn()
    setIsloading(false)
  }, [])

  // 所属しているグループを取得
  const getBelongGroups = async () => {
    const groups = await requestBelongGroups()
    setGroups(groups)
    return;
  }

  // 新規グループを作成可能かの判定
  const verifyGroupBtn = async () => {
    const currentUser = firebase.auth().currentUser
    let hasHost: boolean
     await db.collection('groups').doc(currentUser.uid).get().then(snap => {
      snap.exists ? hasHost = true : hasHost = false
    })
    return setHost(hasHost)
  }

  // モーダルを閉じる
  const handleCloseModal = () => {
    setShowTransferModal(false)
  }

  // グループへ移動
  const handleTransfer = (groupId: string) => {
    if (currentGroupId === groupId) {
      return;
    } else {
      setDrawerIsLoading(true)
      setTimeout(() => {
        requestTransfer(groupId)
        navigation.navigate('mainContainer', { currentGroupId: groupId })
        setCurrentGroupId(groupId)
        setIsloading(false)
        setShowTransferModal(false)
        setDrawerIsLoading(false)
      }, 1000)
    }
  }

  // グループを作成する
  const handleCreateGroup = async () => {
    const currentUser = firebase.auth().currentUser
    const groupUsersRef = db.collectionGroup('groupUsers').where('uid', '==', currentUser.uid)
    let groupsLength: number
    
    await groupUsersRef.get().then(async snap => {
      groupsLength = snap.size
    })

    
    if (groupsLength >= 5 && !isDeveloper(currentUser.uid)) {
      return Alert.alert(INVITE_ERROR_MESSAGE.MORE_THAN_5_GROUPS)
    } else {
      setDrawerIsLoading(true)
      setTimeout( async () => {
        const groupId = await createGroup()
        navigation.navigate('main', { currentGroupId: groupId })
        setCurrentGroupId(groupId)
        setGroups(state => 
          [...state, { name: currentUser.displayName, 
                       inviteCode: '',
                       imageUrl: '',
                       groupName: '',
                       id: groupId,
                       ownerId: currentUser.uid, 
                       users: [{ imageUrl: currentUser.photoURL, name: currentUser.displayName, uid: currentUser.uid }]}])
        setIsloading(false)
        setShowTransferModal(false)
        setDrawerIsLoading(false)
      }, 1000)
    }
  }

  // グループ作成モーダル表示
  const handleAddGroup = () => 
    Alert.alert(
      "グループを作成しますか？",
      "※ 所属できるグループは5つまでです。",
      [
        {
          text: "キャンセル",
          style: 'cancel'
        },
        {
          text: '作成する',
          onPress: () => handleCreateGroup()
        }
      ],
      { cancelable: false }
    )
  

  if (isloading || !currentGroupId) {
    return (
      <Loading size="small" />
    )
  }

  // グループ画像の表示
  const renderGroupImage = (imageUrl: string | undefined, userImages: string[]) => {
    return (
      imageUrl ? <GroupImage url={imageUrl} height={50} width={50} />
      : <UnSettingGroupImage urls={userImages} width={50} height={50} />
    )
  } 

  // グループを表示する
  const renderGroups = (
    groups.length && groups[0].users.length ? (
      groups.map(group => {
        let userNames = ""
        let userImages: string[] = []
        group.users.map(user => {
          userNames += user.name + "  "
          userImages.push(user.imageUrl)
        })
        return (
          <GroupNameWrapper key={group.id} onPress={() => handleTransfer(group.id)}>
            {renderGroupImage(group.imageUrl, userImages)}
            <GroupNameText>{group.groupName ? group.groupName : truncateText(userNames, 40)}</GroupNameText>
            {currentGroupId === group.id ? <Icon name="check-circle" size={25}  style={{ color: '#32CD32' }}/> : null}
          </GroupNameWrapper>
        )
      })
    ) : (
      null
    )
  )

  // 新規グループ作成ボタンを表示
  const renderCreateGroupBtn = (
    <GroupCreateContainer onPress={() => handleAddGroup()}>
      <FeatherIcon name="plus" size={25} style={{ color: COLORS.BASE_MUSCLEW }}/>
      <GroupCreateText>新しくグループを作成する</GroupCreateText>
    </GroupCreateContainer>
          
  )

  return (
    <Modal isVisible={showTransferModal} swipeDirection='down' onSwipeComplete={handleCloseModal}>
      <Container>
        <CloseBar />
        <TransferTitleWrapper>
          <TransferTitle>グループを切り替える</TransferTitle>
        </TransferTitleWrapper>
        <GroupContainer>
          {renderGroups}
          {renderCreateGroupBtn}
        </GroupContainer>
      </Container>
    </Modal>
  )
}

export default TranferModal;

const Container = styled.View`
  position: absolute;
  bottom: -20px;
  width: 110%;
  border-radius: 10px;
  padding: 5px 0px 30px 0;
  max-height: 900px;
  min-height: 400px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`
const TransferTitleWrapper = styled.View`
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

const TransferTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 25px 0 5px 0;
  color: ${COLORS.BASE_BLACK};
`

const GroupContainer = styled.View`
`

const GroupNameWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 1px;
  padding: 10px 20px;
`

const GroupNameText = styled.Text`
  width: 80%;
  padding: 0 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  font-weight: bold;
`

const CloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

const GroupCreateContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
`

const GroupCreateText = styled.Text`
  width: 85%;
  padding: 0 20px 0 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
`