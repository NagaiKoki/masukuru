import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import apis
import { 
  requestPutCommentPushNotification,
  requestFetchSettings
} from '../../../apis/Settings'
// import components
import Item from '../../../common/List/item'
// import constants
import { COLORS } from '../../../constants/Styles';
// import types
import { ResponseSettingType } from '../../../types/Setting'

const SettingPushList = () => {
  const [toggleComment, setToggleComment] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const fetchPushSetting = async () => {
        const { payload, error }: { payload?: ResponseSettingType, error?: string } = await requestFetchSettings()
      
        if (payload && !error) {
          setToggleComment(!!payload.isCommentPush)
        }
      }
      fetchPushSetting()
      setIsMounted(true)
    }, [])
  )

  if (!isMounted) {
    return null
  }

  const handleOnToggleComment = async () => {
    setToggleComment(!toggleComment)
    await requestPutCommentPushNotification()
  }

  const renderToggleIcon = (toggle: boolean): JSX.Element => {
    return (
      <Icon 
        name={ toggle ? "toggle-on" : "toggle-off" } 
        size={30}
        style={{ color: COLORS.TOGGLE_ON_COLOR }}
      /> 
    )
  }

  return (
    <PushListContainer>
      <Item
        title="記録へのコメント"
        icon={renderToggleIcon(toggleComment)}
        handleOnClick={handleOnToggleComment}
      />
    </PushListContainer>
  )
}

export default SettingPushList

const PushListContainer = styled.View`
  background: ${COLORS.BASE_WHITE};
  margin: 40px 0;
  border-top-color: ${COLORS.BORDER_COLOR_1};
  border-top-width: 1px;
`