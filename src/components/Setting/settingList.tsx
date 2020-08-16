import React from 'react'
import styled from 'styled-components'
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'
// import constants
import { COLORS } from '../../constants/Styles';
// import components
import Item from '../../common/List/item'

interface SettingListProps {
  navigation: StackNavigationProp<{'settingPush'}>
}

const SettingList = (props: SettingListProps) => {
  const { navigation } = props

  const handleOnNavigate = () => {
    navigation.navigate('settingPush')
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
        title="通知"
        icon={renderIcon}
        handleOnClick={handleOnNavigate}
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