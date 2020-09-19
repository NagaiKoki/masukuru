import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Permissions from 'expo-permissions'
import styled from 'styled-components'
import { Pedometer } from 'expo-sensors'
import { useActionSheet } from '@expo/react-native-action-sheet'
// import conponents
import Chart from '../../common/Chart'
import SelectTermBtn from './Term/SelectTermBtn'
import EmptyState from './EmptyState'
// import constants
import { COLORS } from '../../constants/Styles'
// import slice
import { requestFetchChartSetting } from '../../slice/chart'
// import selectors
import chartSelector from '../../selectors/chart'
// import types
import { ChartTermType } from '../../types/Chart'
// import utils
import { 
  getMidnightTime, 
  getHourLaterTime, 
  getNextDay, 
  getLastDay,
  convertTimeStampToStringOnlyDate,
  convertTimeStampToStringOnlyMonthAndDate,
  isToday,
  isLastWeek
} from '../../utilities/timestamp'
import { hapticFeedBack } from '../../utilities/Haptic'
import Analytics from '../../config/amplitude'

const getLastWeekLabels = (): string[] => {
  let days: string[] = []
  for (let i = 0; i < 7; i++) {
    const lastDay = getLastDay(new Date(), i)
    days.unshift(convertTimeStampToStringOnlyMonthAndDate(undefined, lastDay))
  }
  return days;
}

const PedometerChart = () => {
  const [stepCount, setStepCount] = useState(0)
  const [pastSteps, setPastSteps] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [availableSensor, setAvailableSensor] = useState(false)
  const [term, setTerm] = useState<Extract<ChartTermType, 'day' | 'week'>>('day')
  const [currentDate, setCurrentDate] = useState(getMidnightTime(new Date))
  const LABELS = term === 'day' ? ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'] : getLastWeekLabels()
  const { showActionSheetWithOptions } = useActionSheet();
  const { walkingGoal } = chartSelector()
  const dispatch = useDispatch()

  // 歩行数を取得する
  const getPastSteps = async (date: Date, term: Extract<ChartTermType, 'day' | 'week'> = 'day') => {
    let pastSteps: number[] = []
    
    if (term === 'day') {
      for (let i = 0; i < 24; i++ ) {
        const pastStep = await Pedometer.getStepCountAsync(getHourLaterTime(date, i), getHourLaterTime(date, i + 1))
        pastSteps.push(pastStep.steps)
      }
    } else if (term === 'week') {
      for (let i = 6; i >= 0; i--) {   
        const pastStep = await Pedometer.getStepCountAsync(getLastDay(date, i), getLastDay(date, i - 1))
        pastSteps.push(pastStep.steps)
      }
    }
    setPastSteps(pastSteps)
  }

  useEffect(() => {
    Analytics.track('visitPedometerChart')
    const isPedometerAvailable = async () => {
      const isAvailable = await Pedometer.isAvailableAsync()
      const { status } = await Permissions.askAsync(Permissions.MOTION);
      setAvailableSensor(isAvailable && status === 'granted')
      return isAvailable
    }

    if (isPedometerAvailable()) {
      Pedometer.watchStepCount(result => {
        setStepCount(result.steps)
      })
    }
    dispatch(requestFetchChartSetting())
    setIsMounted(true)
  }, [])

  useEffect(() => {
    getPastSteps(currentDate, 'day')
  }, [stepCount])

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
        setCurrentDate(new Date())
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

  const rangeDate = (): string => {
    if (term === 'day') {
      return convertTimeStampToStringOnlyDate(undefined, currentDate)
    } else if (term === 'week') {
      const lastWeekDays = convertTimeStampToStringOnlyDate(undefined, getLastDay(currentDate, 6))
      const today = convertTimeStampToStringOnlyDate(undefined, new Date)
      return `${lastWeekDays} ~ ${today}`
    }
  }

  const disable = (bool: boolean) => {
    return bool || term === 'week'
  }

  const isAchieved = (): boolean => {
    const sum = pastSteps.reduce((p, c) => p + c)
    return Number(sum) >= walkingGoal
  }

  const diffMessage = () => {
    if (term === 'week') return
    const diff = Number(pastSteps.reduce((p, c) => p + c)) - walkingGoal
    if (walkingGoal === 0) {
      return '右上の設定から目標歩数を設定しよう♪'
    } else if (isAchieved()) {
      return `+${diff}歩で目標達成しました♪`
    } else {
      return `目標達成まで、あと${Math.abs(diff)}歩です。`
    }
  }
  
  if (!availableSensor || (!pastSteps.length && isMounted)) {
    return (
      <EmptyState text="歩数の計測を許可する" />
    )
  }

  return (
    isMounted && pastSteps.length ?
    <Container>
      <ChartWrapper>
        <GoalText>{ term === 'day' ? `目標歩数 ${walkingGoal === 0 ? '--' : walkingGoal}歩` : null }</GoalText>
        <CurrentStepText>{pastSteps.reduce((p, c) => p + c).toLocaleString()}歩</CurrentStepText>
        <AchivedText>{diffMessage()}</AchivedText>
        <DateRangeContainer>
          <DateRangeWrapper>
            <SelectTermBtn 
              direction="backward"
              disable={disable(isLastWeek(currentDate))}
              activeOpacity={disable(isLastWeek(currentDate)) ? 1 : 0.6}
              handleOnClick={handleGetBackward}
            />
            <DateRangeText>{rangeDate()}</DateRangeText>
            <SelectTermBtn 
              direction="forward"
              disable={disable(isToday(currentDate))}
              activeOpacity={disable(isToday(currentDate)) ? 1 : 0.6}
              handleOnClick={handleGetForward}
            />
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
    </Container> : null
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

const AchivedText = styled.Text`
  margin: 10px 0;
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