import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import components
import WeightChart from '../../../components/Charts/WeightChart'
import PedometerChart from '../../../components/Charts/PedometerChart'
import Header from '../../../components/Charts/Header/index'
import AddButton from '../../../components/Charts/AddButton'
// import constants
import { COLORS } from '../../../constants/Styles'

const ChartScreen = ({ navigation }) => {
  const [index, setIndex] = useState(1)

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => {
          return (
            <EvilIcons name="gear" 
              size={24}
              onPress={() => navigation.navigate('chartSetting')}
              style={{ paddingRight: 20, color: COLORS.BASE_WHITE }}
            />
          )
        }
      })
    }, [])
  )

  const renderChart = () => {
    switch(index) {
      case 0: {
        return (
          <WeightChart />
        )
      }
      case 1: {
        return (
          <PedometerChart />
        )
      }
    }
  }

  return (
    <Container>
      <Header 
        index={index}
        setIndex={setIndex}
      />
      <Wrapper>
        {renderChart()}
      </Wrapper>
      { index === 0 ? <AddButton navigation={navigation} /> : null }
    </Container>
  )  
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const Wrapper = styled.ScrollView`
`

export default ChartScreen