import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'firebase';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface DrawerProps {
  user: firebase.User,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const DrawerContent = (props: DrawerProps) => {
  const { user, navigation } = props;

  // TODO ロジックは違うファイルに押し込みたい
  const logout = async () => {
    await firebase.auth().signOut().then(function() {
      navigation.navigate('SignoutLoading');
    })
  };

  return (
    <DrawerContainer>
      <DrawerUserContainer>
        <DrawerUserImage>
          <Image 
            source={{ uri: user.photoURL }}
            style={{ width: 80, height: 80, borderRadius: 5, resizeMode: 'cover', alignSelf: 'center' }}
          /> 
        </DrawerUserImage>
        <DrawerUserName>{user.displayName}</DrawerUserName>
      </DrawerUserContainer>

      <DrawerListContainer>
        <DrawerListItem>
          <Icon name="user" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={ () => { navigation.navigate('Mypage') } }>
            <DrawerListItemText>マイページ</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="plus" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={ () => { navigation.navigate('Mypage') } }>
            <DrawerListItemText>友達をグループに招待する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="envelope-open" size={25} color={COLORS.BASE_BORDER_COLOR}/>

          <DrawerListItemBtn block onPress={ () => { navigation.navigate('Mypage') } }>
            <DrawerListItemText>招待されたグループに参加する</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

        <DrawerListItem>
          <Icon name="logout" size={25} color={COLORS.BASE_BORDER_COLOR}/>
        
          <DrawerListItemBtn block onPress={ () => logout() }>
            <DrawerListItemText>ログアウト</DrawerListItemText>
          </DrawerListItemBtn>
        </DrawerListItem>

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
  padding-left: 15px;
`

const DrawerUserImage = styled.View`

`

const DrawerListContainer = styled.View`
  padding: 20px 0;
`

const DrawerListItemBtn = styled.TouchableOpacity`

`

const DrawerListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
`

const DrawerListItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-left: 15px;
  font-size: 16px;
`

export default DrawerContent;