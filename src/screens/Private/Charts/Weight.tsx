import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import WeightChart from '../../../components/Charts/WeightChart'
import Header from '../../../components/Charts/Header'

const ChartScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0)

  const renderChart = () => {
    switch(index) {
      case 0: {
        return (
          <WeightChart />
        )
      }
    }
  }

  console.log(index)

  return (
    <Container>
      <Header 
        index={index}
        setIndex={setIndex}
      />
      {renderChart()}
    </Container>
  )  
}

const Container = styled.View``

const Sample = styled.Text``

export default ChartScreen