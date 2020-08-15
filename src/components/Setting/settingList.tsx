import React from 'react'
import styled from 'styled-components'
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
// import types

interface SettingListProps {
  navigation: StackNavigationProp<{}>
}

const SettingList = (props: SettingListProps) => {
  const { navigation } = props

  return (
    <SettingListContainer>
      <SettingItemWrapper>
        <SettingItemText>通知</SettingItemText>
        <Icon name="arrow-right" size={25} />
      </SettingItemWrapper>
    </SettingListContainer>
  )
}

export default SettingList

const SettingListContainer = styled.View`
  background: ${COLORS.BASE_WHITE};
`

const SettingItemWrapper = styled.View`
  padding: 50px 0;
`

const SettingItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
`