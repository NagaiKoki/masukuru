import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import constants
import { COLORS } from '../../constants/Styles';
// import components
import Item from '../../common/List/item'

interface SettingListProps {
  navigation: any
}

const SettingList = (props: SettingListProps) => {
  const { navigation } = props

  const handleOnNavigate = (navigationName: string) => {
    navigation.navigate(navigationName)
  }

  const renderIcon =
  <Icon 
    name="angle-right" 
    size={20}
    style={{ color: COLORS.BASE_BLACK }}
  /> 

  return (
    <SettingListContainer>
      <Item 
        title="プッシュ通知"
        icon={renderIcon}
        handleOnClick={() => handleOnNavigate('settingPush')}
      />
      <Item 
        title="プライバシー設定"
        icon={renderIcon}
        handleOnClick={() => handleOnNavigate('settingPrivacy')}
      />
    </SettingListContainer>
  )
}

export default SettingList

const SettingListContainer = styled.View`
  background: ${COLORS.BASE_WHITE};
  margin: 40px 0;
  border-top-color: ${COLORS.BORDER_COLOR_1};
  border-top-width: 1px;
`