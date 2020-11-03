import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import apis
import { requestFetchSettings, requestPutSetting } from '../../../../apis/Settings'
// import types
import { ResponseSettingType, SettingType } from '../../../../types/Setting'
// import components
import Item from '../../../../common/List/item'
import { COLORS } from '../../../../constants/Styles';
// import utils
import { hapticFeedBack } from '../../../../utilities/Haptic';

const ProfileSettingPrivacyScreen = () => {
  const [hideWeight, setHideWeight] = useState(true)
  const [isMounted, setIsMonted] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const fetchPushSetting = async () => {
        const { payload, error }: { payload?: ResponseSettingType, error?: string } = await requestFetchSettings()
        if (payload && !error) {
          setHideWeight(!payload.visibleWeight)
        }
      }
      fetchPushSetting()
      setIsMonted(true)
    }, [])
  )

  if (!isMounted) {
    return null
  }

  const handleOnToggle = async (type: SettingType, toggle: boolean) => {
    hapticFeedBack('medium')
    switch(type) {
      case 'visibleWeight': {
        setHideWeight(!toggle)
        return await requestPutSetting(type)
      }
    }
  }

  const renderToggleIcon = (toggle: boolean) => {
    return (
      <Icon 
        name={ toggle ? "toggle-on" : "toggle-off" } 
        size={30}
        style={{ color: COLORS.TOGGLE_ON_COLOR }}
      /> 
    )
  }

  return (
    <Container>
      <Wrapper>
        <Item
          title="マイページの体重を非公開にする"
          icon={renderToggleIcon(hideWeight)}
          handleOnClick={() => handleOnToggle('visibleWeight', hideWeight)}
        />
      </Wrapper>
    </Container>
  )
}

export default ProfileSettingPrivacyScreen

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
  padding: 30px 0;
`

const Wrapper = styled.View`
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
`