import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const NotificationScreen = () => {
  return (
    <NotificationConitainer>

    </NotificationConitainer>
  )
}

export default NotificationScreen

const NotificationConitainer =  styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`


