import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
// import actions
// import {  } from '../../../actions/'
// import components
import Item from '../../../common/List/item'
// import constants
import { COLORS } from '../../../constants/Styles';

const SettingPushList = () => {
  const [toggleComment, setToggleComment] = useState(true)

  const handleOnToggleComment = () => {
    setToggleComment(!toggleComment)
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
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
`