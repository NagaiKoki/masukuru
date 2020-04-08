import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign'

interface MenuAddModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const MenuAddModal = (props: MenuAddModalProps) => {
  const [count, SetCount] = useState<number>(1)
  const [amounts, setAmounts] = useState<number[]>([0])

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

  return (
    <Modal isVisible={isVisible}>
      <MenuModalWrapper>
        <ModalCloseBtn>
          <Icon name='close' onPress={handleCloseModal}/>
        </ModalCloseBtn>
        <MenuModalTitle>記録を残す</MenuModalTitle>
        <MenuModalSubText>トレーニングお疲れ様です♪</MenuModalSubText>

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
        </MenuFormContainer>
      
      </MenuModalWrapper>
    </Modal>
  )
}

const MenuModalWrapper = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  border-radius: 10px;
  padding: 15px;
  position: absolute;
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
  padding-top: 10px;
`

const MenuFormTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  width: 90%;
  align-self: center;
  padding: 30px 0 10px 0;
`

const MenuFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  align-self: center;
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
  margin-left: 10px;
`

const MenuAmountForm = styled.TextInput`
  padding: 5px 20px;
  font-size: 16px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 2;
`

export default MenuAddModal;
