import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Pedometer } from 'expo-sensors'
// import utils
import { getMidnightTime, getNextDay, getHourLaterTime } from '../../utilities/timestamp'
// import conponents
import Chart from '../../common/Chart'
// import constants
import { COLORS } from '../../constants/Styles'

const PedometerChart = () => {
  const [stepCount, setStepCount] = useState(0)
  const [pastSteps, setPastSteps] = useState<number[]>([])
  const LABELS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

  useEffect(() => {
    const isPedometerAvailable = async () => {
      const isAvailable = await Pedometer.isAvailableAsync()
      return isAvailable
    }

    if (isPedometerAvailable()) {
      Pedometer.watchStepCount(result => {
        setStepCount(result.steps)
      })
    }
  }, [])

  useEffect(() => {
    const start = getMidnightTime(new Date())
    const getPastSteps = async () => {
      let pastSteps: number[] = []
      for (let i = 0; i < 24; i++ ) {
        const pastStep = await Pedometer.getStepCountAsync(getHourLaterTime(start, i), getHourLaterTime(start, i + 1))
        pastSteps.push(pastStep.steps)
      }
      
      setPastSteps(pastSteps)
    }
    getPastSteps()
  }, [stepCount])

  if (!pastSteps.length) {
    return <></>
  }

  return (
    <Container>
      <ChartWrapper>
        <GoalText>目標歩数 10000歩</GoalText>
        <CurrentStepText>{pastSteps.reduce((p, c) => p + c).toLocaleString()}歩</CurrentStepText>
        <Chart 
          data={pastSteps}
          labels={LABELS}
          yAxisSuffix=""
        />
      </ChartWrapper>
    </Container>
  )
}

export default PedometerChart

const Container = styled.View``

const ChartWrapper = styled.View`
  background: ${COLORS.BASE_WHITE};
  padding: 10px 15px 0 0;
  height: 480px;
  border-radius: 10px;
`

const GoalText = styled.Text`
  margin-top: 15px;
  text-align: center;
  font-size: 15px;
  color: ${COLORS.SUB_BLACK};
`

const CurrentStepText = styled.Text`
  margin: 10px 0 5px 0;
  text-align: center;
  font-weight: bold;
  font-size: 35px;
  color: ${COLORS.BASE_BLACK};
  letter-spacing: 4;
`