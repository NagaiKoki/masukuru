import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
// import constants
import { COLORS } from '../../constants/Styles'

interface ChartProps {
  labels: string[]
  data: number[]
}

const Chart = (props: ChartProps) => {
  const { labels, data } = props

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    strokeWidth: 1,
    useShadowColorFromDataset: true,
    fillShadowGradient: COLORS.MUSCLEW_COLOR,
    fillShadowGradientOpacity: 0.6,
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: COLORS.BASE_BORDER_COLOR,
    },
    color: () => COLORS.BASE_BLACK,
  };

  return (
    <LineChart 
        data={{
          labels: labels,
          datasets: [{
            data: data,
            color: (opacity = 1) => COLORS.MUSCLEW_COLOR,
            strokeWidth: 3
          }]
        }}
        style={{
          borderRadius: 10,
          marginVertical: 8
        }}
        chartConfig={chartConfig}
        yAxisSuffix={'kg'}
        height={220}
        getDotColor={() => `${COLORS.BASE_MUSCLEW}`}
        width={Dimensions.get("window").width - 30}
        bezier
        fromZero
      />
  )
}

export default Chart