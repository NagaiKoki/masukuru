import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import components
import Item from '../../../../common/List/item'
import { COLORS } from '../../../../constants/Styles'


const ChartSettingScreen = ({ navigation }) => {

  const handleNavigate = (navigationName: string) => {
    navigation.navigate(navigationName)
  }

  const renderIcon =
    <Icon 
      name="angle-right" 
      size={20}
      style={{ color: COLORS.BASE_BLACK }}
    /> 

  return (
    <Container>
      <ListWrapper>
        <Item 
          title="目標値の設定"
          icon={renderIcon}
          handleOnClick={ () => handleNavigate('goalSetting') }
        />
      </ListWrapper>
    </Container>
  )
}

export default ChartSettingScreen

const Container = styled.View`
  flex: 1;
  padding: 40px 0;
  background: ${COLORS.BASE_BACKGROUND};
`

const ListWrapper = styled.TouchableOpacity`
  border-top-width: 1;
  border-top-color: ${COLORS.BORDER_COLOR_1};
`