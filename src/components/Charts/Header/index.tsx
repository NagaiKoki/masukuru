import React, { useState, Dispatch, SetStateAction } from 'react'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { View, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components'
// import screen
import WeightChart from '../WeightChart'
import FatChart from '../FatChart'

interface ChartHeaderProps {
  index: number
  setIndex: Dispatch<SetStateAction<number>>
}
 
const ChartHeader = (props: ChartHeaderProps) => {
  const { index, setIndex } = props

  const handleOnSwitch = (labelIndex: number) => {
    return setIndex(labelIndex)
  }

  return (
    <ScrollableTabView
      style={{ marginTop: 0 }}
      initialPage={index}
      onChangeTab={ (obj) => handleOnSwitch(obj.i) }
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