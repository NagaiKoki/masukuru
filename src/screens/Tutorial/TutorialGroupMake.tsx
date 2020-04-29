import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import { COLORS } from '../../constants/Styles';
import Modal from 'react-native-modal';
import { factoryRandomCode } from '../../lib/randomTextFactory';
import firebase, { db } from '../../config/firebase';
import Icon from 'react-native-vector-icons/AntDesign';

const TutorialGroupMakeScreen = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [codeText, setCodeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = firebase.auth().currentUser;
  const groupRef = db.collection('groups')

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  // １人で使う場合の処理
  const notInvitedGroupCreate = () => {    
    try {
      groupRef.doc(currentUser.uid).set({
        ownerId: currentUser.uid,
        name: currentUser.displayName
      }).then(function() {
        groupUser()
      }).then(function(){
        saveInvideCode()
      }).then(function() {
        route.params.setIsChange(true)
        navigation.navigate('home', { currentGroupId: currentUser.uid })
        route.params.setIsChange(false)
      }).catch(function(error) {
        alert(error);
      })
    } catch(error) {
      alert('原因不明のエラーが発生しました。')
    }
  }

  // 招待された場合の処理
  const InvitedGroupJoin = () => {
    try {
      groupRef.where('inviteCode', '==', codeText).get()
        .then(snapshot => {
      if (snapshot.empty) {
        Alert.alert('入力した招待コードは存在しません。今一度、招待コードをお確かめください。');
      } else {
        snapshot.docs[0].ref.collection('groupUsers').get().then(snap => {
          if (snap.size >= 5) {
            return Alert.alert('招待されたグループの人数が5人以上のため、参加することができません。別のグループに参加するか、まずは１人で使うを選択してください。')
          } else {
            snapshot.docs[0].ref.collection('groupUsers').doc(currentUser.uid).set({
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
        })
      }
    })
    } catch(error) {
      Alert.alert('原因不明のエラーが発生しました。')
    }
  }

  // グループコレクション配下に、所属するユーザーのサブコレクションを作成する
  const groupUser = () => {
    groupRef.doc(currentUser.uid).collection('groupUsers').doc(currentUser.uid).set({
      uid: currentUser.uid,
      name: currentUser.displayName,
      imageUrl: currentUser.photoURL,
      currentGroupId: currentUser.uid
    })
  }

  // 招待コードを保存する
  const saveInvideCode = () => {
    const inviteCode = factoryRandomCode(6);
    groupRef.where('inviteCode', '==', inviteCode).get()
    .then(snapshot => {
      if (snapshot.empty) {
        groupRef.doc(currentUser.uid).update({
          inviteCode: inviteCode
        })
      } else {
        // まずないが、ランダムな生成コードが他のグループと被った場合に、再帰処理をする
        saveInvideCode();
      };
    })
  };

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
          <TutorialInviteBtn onPress={ () => notInvitedGroupCreate() }>
            <TutorialInviteText>ひとまず１人で使う</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>１人で使ってみて、その後に友達を招待しよう！</TutorialInviteSubText>
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