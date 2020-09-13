import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Chart from '../../common/Chart'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useActionSheet } from '@expo/react-native-action-sheet'
// import types
import { ChartTermType } from '../../types/Chart'
// import components
import Loading from '../Loading'
// import selectors
import chartSelector from '../../selectors/chart'
// import slices
import { requestFetchWeights, requestFetchChartSetting } from '../../slice/chart'
// import utils
import { 
  getRequireWeightData, 
  getLastDay, 
  getNextDay,
} from '../../utilities/Chart'
import { getMidnightTime } from '../../utilities/timestamp'
// import constants
import { COLORS } from '../../constants/Styles'

const WeightChart = () => {
  const dispatch = useDispatch()
  const { showActionSheetWithOptions } = useActionSheet();
  const { weights, isLoading, weightGoal } = chartSelector()
  const [endDate, setendDate] = useState(new Date())
  const [term, setTerm] = useState<ChartTermType>('week')

  console.log(weights.length)

  useEffect(() => {
    dispatch(requestFetchWeights({ date: endDate, type: term }))
    dispatch(requestFetchChartSetting())
  }, [])

  const { weightArry, dateArry, datesWithYear } = getRequireWeightData(weights, endDate, term)
  const headDate = datesWithYear[0]
  const lastDate = datesWithYear[datesWithYear.length - 1]

  const handleFetchBackward = () => {
    const lastDay = getLastDay(endDate, term)
    setendDate(lastDay)
    dispatch(requestFetchWeights({ date: lastDay, type: term }))
  }

  // 末日が今日であるか？
  const isTodayLastDay = getMidnightTime(new Date).getTime() === getMidnightTime(endDate).getTime()

  const handleFetchForward = () => {
    if (isTodayLastDay) return
    const nextDay = getNextDay(endDate, term)
    setendDate(nextDay)
    dispatch(requestFetchWeights({ date: nextDay, type: term }))
  }

  const handleOnClickTerm = () => {
    const options = ['週', '月', '年', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          setTerm('week')
          dispatch(requestFetchWeights({ date: new Date, type: 'week' }))
        } else if (buttonIndex === 1) {
          setTerm('month')
          dispatch(requestFetchWeights({ date: new Date, type: 'month' }))
        } else if (buttonIndex === 2) {
          setTerm('year')
          dispatch(requestFetchWeights({ date: new Date, type: 'year' }))
        }
      }
    )
  }

  const termLabel = (): '月' | '週' | '年' => {
    if (term === 'month') {
      return '月'
    } else if (term === 'week') {
      return '週'
    } else if (term === 'year') {
      return '年'
    }
  }
  
  return (
    <Container>
      <ChartWrapper>
        <Title>目標体重</Title>
        <GoalText>{weightGoal === 0 ? `--` : weightGoal}kg</GoalText>
        <DateRangeContainer>
          <DateRangeWrapper>
            <IconButton onPress={handleFetchBackward}>
              <Icon name="angle-left" size={20} />
            </IconButton>
            <DateRangeText>{`${headDate}${lastDate ? ' ~ ' : ''}${lastDate}`}</DateRangeText>
            <IconButton onPress={handleFetchForward} disable={isTodayLastDay} activeOpacity={ isTodayLastDay ? 1 : 0.6 }>
              <Icon name="angle-right" size={20} />
            </IconButton>
          </DateRangeWrapper>
          <MonthButton onPress={handleOnClickTerm}>
            <MonthText>{termLabel()}</MonthText>
          </MonthButton>
        </DateRangeContainer>
        { isLoading ? 
          <Loading size='small' /> :
          <Chart 
            labels={ isLoading ? [''] : dateArry }
            data={ isLoading ? [0] : weightArry }
          />
        }
      </ChartWrapper>
    </Container>
  )
}

export default WeightChart

const Container = styled.View`
  margin-top: 30px;
`

const ChartWrapper = styled.View`
  background: ${COLORS.BASE_WHITE};
  padding: 10px 15px 0 0;
  height: 400px;
  margin: 0 5px;
  border-radius: 10px;
  box-shadow: 10px 5px 5px ${COLORS.FORM_BACKGROUND};
`

const Title = styled.Text`
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const GoalText = styled.Text`
  margin: 15px 0 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${COLORS.BASE_BLACK};
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
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 30;
  background: ${props =>  props.disable ? COLORS.BASE_WHITE : COLORS.SUB_BACKGROUND};
`

const MonthButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
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
  font-size: 14px;
`