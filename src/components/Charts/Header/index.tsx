import React, { Dispatch, SetStateAction } from 'react'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import styled from 'styled-components'
// import screen
import WeightChart from '../WeightChart'
import FatChart from '../FatChart'
// import constants
import { COLORS } from '../../../constants/Styles'

interface ChartHeaderProps {
  setIndex: Dispatch<SetStateAction<number>>
}
 
const ChartHeader = (props: ChartHeaderProps) => {
  const { setIndex } = props

  const handleOnSwitch = (labelIndex: number) => {
    return setIndex(labelIndex)
  }

  return (
    <ScrollableTabView
      style={{ backgroundColor: COLORS.BASE_MUSCLEW }}
      initialPage={0}
      onChangeTab={ (obj) => handleOnSwitch(obj.i) }
      tabBarBackgroundColor={COLORS.BASE_MUSCLEW}
      tabBarActiveTextColor={COLORS.BASE_WHITE}
      tabBarUnderlineStyle={{ backgroundColor: COLORS.BASE_WHITE }}
      tabBarInactiveTextColor={COLORS.BASE_WHITE}
      tabBarTextStyle={{ fontSize: 16 }}
      renderTabBar={() => <ScrollableTabBar />}
    >
      <TabLabel tabLabel='体重' tabView={WeightChart} onPress={() => handleOnSwitch(0)}>hoge</TabLabel>
      <TabLabel tabLabel='体脂肪' tabView={FatChart} onPress={() => handleOnSwitch(1)}>koki</TabLabel>
    </ScrollableTabView>
  )
}

export default ChartHeader

const Container = styled.View``

const TabLabel = styled.Text``