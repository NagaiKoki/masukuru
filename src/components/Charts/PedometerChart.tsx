import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Pedometer } from 'expo-sensors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useActionSheet } from '@expo/react-native-action-sheet'
// import conponents
import Chart from '../../common/Chart'
// import constants
import { COLORS } from '../../constants/Styles'
// import types
import { ChartTermType } from '../../types/Chart'
// import utils
import { 
  getMidnightTime, 
  getHourLaterTime, 
  getNextDay, 
  getDateLaterTime,
  getLastDay,
  convertTimeStampToStringOnlyDate,
  isToday,
  isLastWeek
} from '../../utilities/timestamp'
import { hapticFeedBack } from '../../utilities/Haptic'

const PedometerChart = () => {
  const [stepCount, setStepCount] = useState(0)
  const [pastSteps, setPastSteps] = useState<number[]>([])
  const [term, setTerm] = useState<Extract<ChartTermType, 'day' | 'week'>>('day')
  const [currentDate, setCurrentDate] = useState(getMidnightTime(new Date))
  const LABELS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
  const { showActionSheetWithOptions } = useActionSheet();

  // 歩行数を取得する
  const getPastSteps = async (date: Date, term: Extract<ChartTermType, 'day' | 'week'> = 'day') => {
    let pastSteps: number[] = []
    
    if (term === 'day') {
      for (let i = 0; i < 24; i++ ) {
        const pastStep = await Pedometer.getStepCountAsync(getHourLaterTime(date, i), getHourLaterTime(date, i + 1))
        pastSteps.push(pastStep.steps)
      }
    } else if (term === 'week') {
      for (let i = 0; i < 7; i++ ) {
        const pastStep = await Pedometer.getStepCountAsync(getDateLaterTime(date, i), getDateLaterTime(date, i + 1))
        pastSteps.push(pastStep.steps)
      }
    }
    setPastSteps(pastSteps)
  }

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
    getPastSteps(currentDate)
  }, [stepCount])

  if (!pastSteps.length) {
    return <></>
  }

  const handleGetForward = () => {
    // 週の場合はiosの仕様上、前後を取得できないためreturnさせる
    if (term === 'week') return
    if (isToday(currentDate)) return
    hapticFeedBack('medium')
    const nextDate = getNextDay(currentDate)
    setCurrentDate(nextDate)
    getPastSteps(nextDate)
  }

  const handleGetBackward = () => {
    if (term === 'week') return
    if (isLastWeek(currentDate)) return
    hapticFeedBack('medium')
    const lastDate = getLastDay(currentDate)
    setCurrentDate(lastDate)
    getPastSteps(lastDate)
  }

  const handleOnClickTerm = () => {
    const options = ['日', '週', 'Cancel'];
    const cancelButtonIndex = 2;
    hapticFeedBack('medium')
    const today = getMidnightTime(new Date())

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          setTerm('day')
          getPastSteps(today, 'day')
        } else if (buttonIndex === 1) {
          setTerm('week')
          getPastSteps(today, 'week')
        }
      }
    )
  }

  const termLabel = (): '週' | '日' => {
    if (term === 'week') {
      return '週'
    } else if (term === 'day') {
      return '日'
    }
  }

  return (
    <Container>
      <ChartWrapper>
        <GoalText>目標歩数 10000歩</GoalText>
        <CurrentStepText>{pastSteps.reduce((p, c) => p + c).toLocaleString()}歩</CurrentStepText>

        <DateRangeContainer>
          <DateRangeWrapper>
            <IconButton onPress={handleGetBackward} disable={isLastWeek(currentDate)}>
              <Icon name="angle-left" size={25} />
            </IconButton>
            <DateRangeText>{convertTimeStampToStringOnlyDate(undefined, currentDate)}</DateRangeText>
            <IconButton onPress={handleGetForward} disable={isToday(currentDate)} activeOpacity={ true ? 1 : 0.6 }>
              <Icon name="angle-right" size={25} />
            </IconButton>
          </DateRangeWrapper>
          <MonthButton onPress={handleOnClickTerm}>
            <MonthText>{termLabel()}</MonthText>
          </MonthButton>
        </DateRangeContainer>
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

const DateRangeContainer = styled.View`
  margin: 15px 0 20px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DateRangeWrapper = styled.View`
  flex-direction: row; 
  align-items: center;
`

const IconButton = styled.TouchableOpacity<{ disable?: boolean }>`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 30;
  background: ${props =>  props.disable ? COLORS.BASE_WHITE : COLORS.SUB_BACKGROUND};
`

const MonthButton = styled.TouchableOpacity`
  width: 60px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 30;
  background: ${COLORS.SUB_BACKGROUND};
`

const DateRangeText = styled.Text`
  margin: 0 20px;
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
`

const MonthText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  font-weight: bold;
  font-size: 16px;
`