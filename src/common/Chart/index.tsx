import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
// import constants
import { COLORS } from '../../constants/Styles'

interface ChartProps {
  labels: string[]
  data: number[]
  yAxisSuffix: string
}

const Chart = (props: ChartProps) => {
  const { labels, data, yAxisSuffix } = props
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    strokeWidth: 1,
    useShadowColorFromDataset: true,
    fillShadowGradient: COLORS.BASE_MUSCLEW,
    fillShadowGradientOpacity: 0.6, 
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: '#efefef',
    },
    propsForLabels: {
      fontSize: 9
    },
    color: () => COLORS.BASE_BLACK,
  };

  return (
    <LineChart 
        data={{
          labels: labels,
          datasets: [{
            data: data,
            color: (opacity = 1) => COLORS.BASE_MUSCLEW,
            strokeWidth: 3
          }]
        }}
        style={{
          marginVertical: 8,
        }}
        chartConfig={chartConfig}
        yAxisSuffix={yAxisSuffix}
        height={220}
        getDotColor={() => `${COLORS.BASE_MUSCLEW}`}
        width={Dimensions.get("window").width - 20}
        bezier
        fromZero
      />
  )
}

export default Chart