import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import components
import Item from '../../../../common/List/item'
import { COLORS } from '../../../../constants/Styles'
// slice
import { requestFetchChartSetting } from '../../../../slice/chart'
// import selectors
import chartSelectors from '../../../../selectors/chart'
// import components
import Loading from '../../../../components/Loading'


const ChartSettingScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const { isLoading } = chartSelectors()

  useEffect(() => {
    dispatch(requestFetchChartSetting())
  }, [])

  if (isLoading) {
    return <Loading size="small" />
  }

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