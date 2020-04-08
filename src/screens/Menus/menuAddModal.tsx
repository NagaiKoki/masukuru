import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { KeyboardAvoidingView } from 'react-native';

interface MenuAddModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const MenuAddModal = (props: MenuAddModalProps) => {
  const [count, SetCount] = useState<number>(2)
  const [amounts, setAmounts] = useState<number[]>([0])
  const [weight, setWeight] = useState<number[]>([0])

  useEffect(() => {

  }, [count])

  const { isVisible, setIsVisible } = props;

  const handleCloseModal = () => {
    setIsVisible(false)
  }

  const renderSetForm = (
      <MenuSetForm 
        placeholder='0'
        keyboardType={'numeric'}
        value={count}
        autoCapitalize={'none'}
        autoCorrect={ false }
        maxLength={1}
        onChangeText={ number => SetCount(number) }
      />
  )

  const renderAmountForm = () => {
    let amountForm = [];
    for (let amountSize = 1; amountSize <= count; amountSize++) { 
      amountForm.push(
        <MenuFormWrapper>
          <MenuFormSubLabel>{amountSize}セット目</MenuFormSubLabel>
          <MenuAmountForm
          placeholder='0'
          keyboardType={'numeric'}
          value={0}
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ number => setAmounts([number]) }
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
        <MenuFormWrapper>
          <MenuFormSubLabel>{weightCount}セット目</MenuFormSubLabel>
          <MenuAmountForm
          placeholder='0'
          keyboardType={'numeric'}
          value={0}
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ number => setWeight([number]) }
          />
          <MenuFormSubText>kg</MenuFormSubText>
        </MenuFormWrapper>
      )
    }
    return weightForm;
  }

  return (
    <Modal isVisible={isVisible}>
        <MenuModalWrapper>
          <ModalCloseBtn>
            <Icon name='close' onPress={handleCloseModal}/>
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

          <MenuFormSubmitBtn>
            <MenuFormSubmitText>送信する</MenuFormSubmitText>
          </MenuFormSubmitBtn>
        </MenuModalWrapper>
    </Modal>
  )
}

const MenuModalWrapper = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  border-radius: 10px;
  padding: 15px;
  position: absolute;
  flex: 1;
  top: 100;
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
  border-bottom-width: 2;
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
  border-bottom-width: 2;
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
