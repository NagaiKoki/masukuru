import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Modal from 'react-native-modal';
import { factoryRandomCode } from '../../lib/randomTextFactory';
import firebase, { db } from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const TutorialGroupMakeScreen = ({ navigation }) => {
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
        console.log(currentUser.displayName)
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
      groupRef.where('invideCode', '==', codeText).get()
        .then(snapshot => {
      if (snapshot.empty) {
        alert('入力した招待コードは存在しません。今一度、招待コードをお確かめください。');
      } else {
        snapshot.docs[0].ref.collection('groupUsers').doc(currentUser.uid).set({
          uid: currentUser.uid,
          name: currentUser.displayName,
          imageUrl: currentUser.photoURL
        }).then(function() {
          navigation.replace('ホーム');
        })
      }
    })
    } catch(error) {
      alert('原因不明のエラーが発生しました。')
    }
  }

  // グループコレクション配下に、所属するユーザーのサブコレクションを作成する
  const groupUser = () => {
    groupRef.doc(currentUser.uid).collection('groupUsers').doc(currentUser.uid).set({
      uid: currentUser.uid,
      name: currentUser.displayName,
      imageUrl: currentUser.photoURL
    })
  }

  // 招待コードを保存する
  const saveInvideCode = () => {
    const invideCode = factoryRandomCode(6);
    groupRef.where('inviteCode', '==', invideCode).get()
    .then(snapshot => {
      if (snapshot.empty) {
        groupRef.doc(currentUser.uid).update({
          invideCode: invideCode
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
      <TutorialGroupTitle>マスクルへようこそ！</TutorialGroupTitle>
        <TutorialGroupSubTitle>マスクルを使って、みんなと一緒に理想な体型を手に入れよう！</TutorialGroupSubTitle>

      <TutorialGroupBtnWrapper>

        <TutorialInviteBtnWrapper>
          <TutorialInviteBtn onPress={ () => notInvitedGroupCreate() }>
            <TutorialInviteText>ひとまず１人で使う</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>１人で使ってみて、その後に友達を招待しよう！</TutorialInviteSubText>
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
const TutorialGroupContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 100px;
`

const TutorialGroupTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  text-align: center;
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
  padding: 20px 0;
  border-radius: 5px;
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

export default TutorialGroupMakeScreen;