import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Chart from '../../common/Chart'
import Icon from 'react-native-vector-icons/FontAwesome'

// import components
import Loading from '../Loading'
// import selectors
import chartSelector from '../../selectors/chart'
// import slices
import { requestFetchWeights } from '../../slice/chart'
// import utils
import { 
  getLastWeekDay, 
  getNextWeekDay
} from '../../utilities/timestamp'
import { getRequireWeightData } from '../../utilities/Chart'
import { COLORS } from '../../constants/Styles'

const WeightChart = () => {
  const dispatch = useDispatch()
  const { weights, isLoading } = chartSelector()
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    dispatch(requestFetchWeights(startDate))
  }, [])

  if (isLoading && !!weights.length) {
    return <Loading size="small" />
  }

  const { weightArry, dateArry, datesWithYear } = getRequireWeightData(weights)
  const firstDate = datesWithYear[0]
  const lastDate = datesWithYear[1] || ''

  const handleFetchLastWeek = () => {
    const lastWeek = getLastWeekDay(startDate)
    setStartDate(lastWeek)
    dispatch(requestFetchWeights(lastWeek))
  }

  const handleFetchNextWeek = () => {
    const nextWeek = getNextWeekDay(startDate)
    setStartDate(nextWeek)
    dispatch(requestFetchWeights(nextWeek))
  }

  return (
    <Container>
      <ChartWrapper>
        <Title>目標体重</Title>
        <DateRangeWrapper>
          <IconButton onPress={handleFetchLastWeek}>
            <Icon name="angle-left" size={20} />
          </IconButton>
          <DateRangeText>{`${firstDate}${lastDate ? ' ~ ' : ''}${lastDate}`}</DateRangeText>
          <IconButton onPress={handleFetchNextWeek}>
            <Icon name="angle-right" size={20} />
          </IconButton>
        </DateRangeWrapper>
        <Chart 
          labels={dateArry}
          data={weightArry}
        />
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
  padding: 10px 20px 0 0;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 10px 5px 5px ${COLORS.FORM_BACKGROUND};
`

const Title = styled.Text`
  margin: 15px 0 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 17px;
`

const DateRangeWrapper = styled.View`
  margin: 15px;
  flex-direction: row;
  align-items: center;
`

const IconButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 30;
`

const DateRangeText = styled.Text`
  margin: 0 20px;
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
`