import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { LineChart } from 'react-native-chart-kit'
// import components
import Loading from '../Loading'
// import selectors
import chartSelector from '../../selectors/chart'
// import slices
import { requestFetchWeights } from '../../slice/chart'

const WeightChart = () => {
  const dispatch = useDispatch()
  const { weights, isLoading } = chartSelector()

  useEffect(() => {
    dispatch(requestFetchWeights())
  }, [])
  
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    strokeWidth: 0.5,
    fillShadowGradient: '#fff',
    color: () => `rgba(89, 87, 87, 1)`,
  };

  if (isLoading) {
    return <Loading size="small" />
  }

  return (
    <Container>
      <LineChart 
        data={{
          labels: ['1月', '2月', '3月', '4月', '5月'],
          datasets: [{
            data: [101, 163, 187, 203, 235]
          }]
        }}
        chartConfig={chartConfig}
        yAxisSuffix={''}
        withInnerLines={false}
        height={181}
        width={200}
        bezier
      />
    </Container>
  )
}

export default WeightChart

const Container = styled.View`
  margin-top: 100px;
`