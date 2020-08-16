import React from 'react'
import styled from 'styled-components'
// import components 
import SettingPushList from '../../../../components/Setting/Push/pushList'
// import constants
import { COLORS } from '../../../../constants/Styles';

const SettingPushScreen = () => {

  return (
    <SettingPushContainer>
      <SettingPushList />
    </SettingPushContainer>
  )
}

export default SettingPushScreen

const SettingPushContainer = styled.View`
  flex: 1;
  background: ${COLORS.BASE_BACKGROUND};
`
