import React from 'react'
import styled from 'styled-components'
import { StackNavigationProp } from '@react-navigation/stack';
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import SettingList from '../../../components/Setting/settingList'

const SettingScreen = ({ navigation }: { navigation: StackNavigationProp<{}> }) => {
  return (
    <SettingContainer>
      <SettingList 
        navigation={navigation}
      />
    </SettingContainer>
  )
}

export default SettingScreen

const SettingContainer = styled.View`
  background: ${COLORS.BASE_BACKGROUND};
`