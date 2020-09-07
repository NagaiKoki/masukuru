import React from 'react'
import styled from 'styled-components'
// import components
import WeightChart from '../../../components/Charts/WeightChart'

const ChartScreen = ({ navigation }) => {
  return (
    <Container>
      <WeightChart />
    </Container>
  )  
}

const Container = styled.View``

export default ChartScreen