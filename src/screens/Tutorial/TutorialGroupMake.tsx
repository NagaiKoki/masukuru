import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';
import { factoryRandomCode } from '../../lib/randomTextFactory';
import Icon from 'react-native-vector-icons/AntDesign';
// import constans
import { COLORS } from '../../constants/Styles';
import { INVITE_ERROR_MESSAGE, COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'
// import apis
import { createGroup } from '../../apis/Groups/create';
import firebase, { db } from '../../config/firebase';

const TutorialGroupMakeScreen = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [codeText, setCodeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = firebase.auth().currentUser;
  const groupRef = db.collection('groups')

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  // 招待された場合の処理
  const InvitedGroupJoin = async () => {
    try {
      groupRef.where('inviteCode', '==', codeText).get()
        .then( async snapshot => {
      if (snapshot.empty) {
        Alert.alert(INVITE_ERROR_MESSAGE.EMPTY_GROUP);
      } else {
        const groupUsersRef = snapshot.docs[0].ref.collection('groupUsers')
        let groupUsersLength: number;
        await groupUsersRef.get().then(snap => {
          groupUsersLength = snap.size
        })
        if (groupUsersLength >= 5) {
          return Alert.alert(INVITE_ERROR_MESSAGE.MORE_THAN_5_USERS)
        } else {
          groupUsersRef.doc(currentUser.uid).set({
            uid: currentUser.uid,
            name: currentUser.displayName,
            imageUrl: currentUser.photoURL,
            currentGroupId: snapshot.docs[0].data().ownerId
          }).then(function() {
            route.params.setIsChange(true)
            navigation.replace('home', { currentGroupId: snapshot.docs[0].data().ownerId });
            route.params.setIsChange(false)
          })
        }
      }
    })
    } catch(error) {
      Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
    }
  }

  // 招待コード送信制御
  const disableSubmit: boolean = (
    codeText && codeText.length === 6 ? false : true
  )

  return (
    <TutorialGroupContainer>
      <TutorialStepTitle>
        - 最後のステップです！ -
      </TutorialStepTitle>
      <TutorialGroupTitle>マスクルへようこそ！</TutorialGroupTitle>
        <TutorialGroupSubTitle>マスクルで、みんなと一緒に理想な体型を手に入れよう！</TutorialGroupSubTitle>

      <TutorialGroupBtnWrapper>

        <TutorialInviteBtnWrapper>
          <TutorialInviteBtn onPress={ () => createGroup(navigation, route) }>
            <TutorialInviteText>最初は１人で使う</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>※ 後から友達を招待することもできます</TutorialInviteSubText>
        </TutorialInviteBtnWrapper>

        <TutorialInvitedBtnWrapper>
          <TutorialInviteBtn onPress={ () => setShowModal(true) }>
            <TutorialInviteText>招待されたグループに参加する</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>招待コードのリンクをお持ちであれば、使いましょう！</TutorialInviteSubText>
        </TutorialInvitedBtnWrapper>

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

            <InvitedModalSubmitBtn block onPress={ () => InvitedGroupJoin() } disabled={disableSubmit} disableSubmit={disableSubmit}>
              <InvitedModalSubmitText>送信する</InvitedModalSubmitText>
            </InvitedModalSubmitBtn>
          </InvideModalView>
        </Modal>

      </TutorialGroupBtnWrapper>
    </TutorialGroupContainer>
  )
}

// メイン画面
const TutorialGroupContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const TutorialGroupTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`

const TutorialStepTitle = styled.Text`
  padding: 50px 0 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${COLORS.SUB_BLACK};
`

const TutorialGroupSubTitle = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  padding: 20px 30px 0 30px;
  color: ${COLORS.BASE_BLACK};
`

const TutorialGroupBtnWrapper = styled.View`
  padding-top: 20px;
`

const TutorialInviteBtnWrapper = styled.View`

`

const TutorialInviteBtn = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 50px;
`

const TutorialInviteSubText = styled.Text`
  font-size: 14px;
  text-align: center;
  padding: 20px 30px 0 30px;
  color: ${COLORS.BASE_BLACK};
`

const TutorialInviteText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const TutorialInvitedBtnWrapper = styled.View`
`

// 招待モーダル
const InvideModalView = styled.View`
  width: 100%;
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

const ModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
`

export default TutorialGroupMakeScreen;