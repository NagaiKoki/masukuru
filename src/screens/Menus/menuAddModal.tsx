import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Header } from 'react-navigation-stack'
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { factoryRandomCode } from '../../lib/randomTextFactory';
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';
import { KeyboardAvoidingView } from 'react-native';

interface MenuAddModalProps {
  item: any,
  setList: Dispatch<SetStateAction<MenuType[]>>
  currentGroupId: string,
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const MenuAddModal = (props: MenuAddModalProps) => {  
  const [count, SetCount] = useState<number>(1)
  const [amount1, setAmount1] = useState<number>()
  const [amount2, setAmount2] = useState<number>(0)
  const [amount3, setAmount3] = useState<number>(0)
  const [amount4, setAmount4] = useState<number>(0)
  const [amount5, setAmount5] = useState<number>(0)
  const [amount6, setAmount6] = useState<number>(0)
  const [amount7, setAmount7] = useState<number>(0)
  const [amount8, setAmount8] = useState<number>(0)
  const [amount9, setAmount9] = useState<number>(0)

  const [weight1, setWeight1] = useState<number>(0)
  const [weight2, setWeight2] = useState<number>(0)
  const [weight3, setWeight3] = useState<number>(0)
  const [weight4, setWeight4] = useState<number>(0)
  const [weight5, setWeight5] = useState<number>(0)
  const [weight6, setWeight6] = useState<number>(0)
  const [weight7, setWeight7] = useState<number>(0)
  const [weight8, setWeight8] = useState<number>(0)
  const [weight9, setWeight9] = useState<number>(0)

  const { item, setList, currentGroupId, isVisible, setIsVisible } = props;
  const currentUser = firebase.auth().currentUser

  useEffect(() => {
  }, [count])

  const isVisibleToBoolean = (
    isVisible ? true : false
  )

  const onSubmitMenu = async () => {
    const currentTime = firebase.firestore.FieldValue.serverTimestamp()
    const menuId = factoryRandomCode(10)
    try {
      await db.collectionGroup('events').where('groupId', '==', currentGroupId).where('name', '==', item.name).get().then(snapshot => {
        snapshot.docs[0].ref.collection('menus').doc(menuId).set({
          uid: currentUser.uid,
          menuId: menuId,
          name: item.name,
          set: count,
          amount1: amount1,
          amount2: amount2,
          amount3: amount3,
          amount4: amount4,
          amount5: amount5,
          amount6: amount6,
          amount7: amount7,
          amount8: amount8,
          amount9: amount9,
          groupId: currentGroupId,
          weight1: weight1,
          weight2: weight2,
          weight3: weight3,
          weight4: weight4,
          weight5: weight5,
          weight6: weight6,
          weight7: weight7,
          weight8: weight8,
          weight9: weight9,

          createdAt: currentTime
        })
      }).then(() => {
        setList(state => [{
          uid: currentUser.uid,
          menuId: menuId,
          name: item.name,
          set: count,
          amount1: amount1,
          amount2: amount2,
          amount3: amount3,
          amount4: amount4,
          amount5: amount5,
          amount6: amount6,
          amount7: amount7,
          amount8: amount8,
          amount9: amount9,
          groupId: currentGroupId,
          weight1: weight1,
          weight2: weight2,
          weight3: weight3,
          weight4: weight4,
          weight5: weight5,
          weight6: weight6,
          weight7: weight7,
          weight8: weight8,
          weight9: weight9,

          createdAt: ""
        }, ...state,])
      }).then(() => {
        setIsVisible(false)
      })
    } catch(error) {
      console.log(error)
      alert('問題が発生しました。しばらくしてから、再度お試しください。')
    }

  }

  // モーダル閉める
  const handleCloseModal = () => {
    setIsVisible(false)
  }

  const handleSetCount = (set) => {
    const setString = String(set)
    if (setString.match(/[^0-9]+/)) {
      alert('数字だけを入力してください。')
      return;
    } else {
      SetCount(set)
    }
  }

  // 回数の動的対象state変更処理
  const handleSetAmount = (count,number) => {
    const str = String(number)
    if (str.match(/[^0-9]+/)) {
      eval("setAmount" + count + `()`)
      alert('数字だけを入力してください。')
      return;
    } else {
      eval("setAmount" + count + `(${number})`)
    }
  }

  const handleSetWeight = (count, number) => {
    const str = String(number)
    if (str.match(/[^0-9]+/)) {
      alert('数字だけを入力してください。')
      return;
    } else {
      eval("setWeight" + count + `(${number})`)
    }
  }

  const renderSetForm = (
      <MenuSetForm 
        placeholder='0'
        keyboardType={'numeric'}
        autoCapitalize={'none'}
        autoCorrect={ false }
        maxLength={1}
        onChangeText={set => handleSetCount(set)}
      />
  )
   
  const renderAmountForm = () => {
    let amountForm = [];
    for (let amountSize = 1; amountSize <= count; amountSize++) { 
      amountForm.push(
        <MenuFormWrapper key={amountSize}>
          <MenuFormSubLabel>{amountSize}セット目</MenuFormSubLabel>
          <MenuAmountForm
            placeholder='0'
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={ false }
            maxLength={3}
            onChangeText={ number => handleSetAmount(amountSize, number) }
          />
          <MenuFormSubText>回</MenuFormSubText>
        </MenuFormWrapper>
      )
    }
    return amountForm;
  }

  const renderWeightForm = () => {
    let weightForm = [];
    for (let weightCount = 1; weightCount <= count; weightCount++) { 
      weightForm.push(
        <MenuFormWrapper key={weightCount}>
          <MenuFormSubLabel>{weightCount}セット目</MenuFormSubLabel>
          <MenuAmountForm
            placeholder='0'
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={ false }
            maxLength={4}
            onChangeText={ number => handleSetWeight(weightCount, number) }
          />
          <MenuFormSubText>kg</MenuFormSubText>
        </MenuFormWrapper>
      )
    }
    return weightForm;
  }

  return (
    <Modal isVisible={isVisibleToBoolean} swipeDirection='down' onSwipeComplete={handleCloseModal}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 0.7 }} keyboardVerticalOffset={700}>
      <MenuModalWrapper>
        <ModalCloseBtn>
          <Icon name='close' size={30} onPress={handleCloseModal}/>
        </ModalCloseBtn>
        <MenuModalTitle>記録を残す</MenuModalTitle>
          <MenuModalSubText>トレーニングお疲れ様です♪</MenuModalSubText>
          <ScrollView>
            <MenuFormContainer>
              <MenuFormTitle>何セットしましたか？</MenuFormTitle>
              <MenuFormWrapper>
                {renderSetForm}
              <MenuFormSubText>セット</MenuFormSubText>
            </MenuFormWrapper>
            
            <MenuFormTitle>各セット、何回ずつしましたか？</MenuFormTitle>
              <MenuAmountFormWrapper>
                {renderAmountForm()}
              </MenuAmountFormWrapper>

            <MenuFormTitle>各セット、重さは何kgでしたか？</MenuFormTitle>
              <MenuAmountFormWrapper>
                {renderWeightForm()}
              </MenuAmountFormWrapper>
            </MenuFormContainer>
          </ScrollView>

        <MenuFormSubmitBtn block onPress={onSubmitMenu} >
          <MenuFormSubmitText>送信する</MenuFormSubmitText>
        </MenuFormSubmitBtn>
      </MenuModalWrapper>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const MenuModalWrapper = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  border-radius: 10px;
  padding: 15px;
  position: absolute;
  height: 600px;
  left: 0;
  right: 0;
`

//  モーダル上部
const MenuModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
`

const MenuModalSubText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  text-align: center;
  padding: 10px;
`

const ModalCloseBtn = styled.TouchableOpacity`
  flex-direction: row-reverse;
`

// フォーム部分
const MenuFormContainer = styled.View`
`

const MenuFormTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  width: 90%;
  align-self: center;
  padding: 40px 0 10px 0;
`

const MenuFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  align-self: center;
  padding: 5px 0;
`

const MenuAmountFormWrapper = styled.View`
  flex-direction: column;
`

const MenuSetFormWrapper = styled.View`
`

const MenuSetForm = styled.TextInput`
  padding: 5px 20px;
  font-size: 16px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 2px;
`

const MenuFormSubText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-left: 10px;
`

const MenuFormSubLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-right: 10px;
`

const MenuAmountForm = styled.TextInput`
  padding: 5px 20px;
  font-size: 16px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 2px;
`

const MenuFormSubmitBtn = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  border-radius: 30px;
  padding: 15px 0;
  margin: 40px 0 20px 0;
  background-color: ${COLORS.BASE_MUSCLEW};
`

const MenuFormSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default MenuAddModal;
