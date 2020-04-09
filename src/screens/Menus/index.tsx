import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, View } from 'react-native'
import { COLORS } from '../../constants/Styles';
import MenuList from './menuList'
import MenuAddModal from './menuAddModal';
import firebase, { db } from '../../config/firebase';

const MunuScreen = ({ route, navigation }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { params } = route;
  const { item } = params;

  return (
    <MenuContainer>
      <KeyboardAvoidingView>
      <MenuTitle>{item.name}</MenuTitle>
      <MenuAddButton block onPress={setIsVisible}>
        <MenuAddText>記録を追加する</MenuAddText>
      </MenuAddButton>

      {/* モーダル */}
      <MenuAddModal item={item} isVisible={isVisible} setIsVisible={setIsVisible} />
      <View style={{ flex : 1 }} />
      <MenuListContainer>
        <MenuListTitle>メンバーの記録</MenuListTitle>
      </MenuListContainer>
      </KeyboardAvoidingView>
    </MenuContainer>
  )
}

const MenuContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  flex: 1;
`

const MenuTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
`

const MenuAddButton = styled.TouchableOpacity`
  background-color: ${COLORS.BASE_MUSCLEW};
  width: 80%;
  align-self: center;
  padding: 15px 0;
  border-radius: 30px;
  margin-top: 40px;
`

const MenuAddText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
`

// menu list
const MenuListContainer = styled.View`

`

const MenuListTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
  width: 80%;
  align-self: center;
  padding: 60px 0 20px 0;
`

export default MunuScreen;