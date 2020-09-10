import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import WeightChart from '../../../components/Charts/WeightChart'
import Header from '../../../components/Charts/Header'
import AddButton from '../../../components/Charts/AddButton'
// import constants
import { COLORS } from '../../../constants/Styles'

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

  return (
    <Container>
      <Header 
        index={index}
        setIndex={setIndex}
      />
      <Wrapper>
        {renderChart()}
      </Wrapper>
      <AddButton navigation={''} />
    </Container>
  )  
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const Wrapper = styled.View`
`

export default ChartScreen