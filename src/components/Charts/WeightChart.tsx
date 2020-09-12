import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Chart from '../../common/Chart'
// import components
import Loading from '../Loading'
// import selectors
import chartSelector from '../../selectors/chart'
// import slices
import { requestFetchWeights } from '../../slice/chart'
// import utils
import { getDayOfWeekBetween, convertTimeStampToStringOnlyMonthAndDate } from '../../utilities/timestamp'
import { COLORS } from '../../constants/Styles'

const WeightChart = () => {
  const dispatch = useDispatch()
  const { weights, isLoading } = chartSelector()
  const [monday, sunday] = getDayOfWeekBetween(new Date())
  const [startDate, setStartDate] = useState(monday)
  
  useEffect(() => {
    dispatch(requestFetchWeights(monday))
  }, [])

  const getRequireData = (): { weightArry: number[], dateArry: string[] } => {
    let weightArry: number[] = []
    let dateArry: string[] = []

    weights.forEach(weight => {
      weightArry.push(weight.weight)
      dateArry.push(convertTimeStampToStringOnlyMonthAndDate(weight.date))
    })

    return { weightArry: weightArry, dateArry: dateArry }
  }

  if (isLoading) {
    return <Loading size="small" />
  }

  return (
    <Container>
      <ChartWrapper>
        <Chart 
          labels={getRequireData().dateArry}
          data={getRequireData().weightArry}
        />
      </ChartWrapper>
    </Container>
  )
}

export default WeightChart

const Container = styled.View`
  margin-top: 100px;
`

const ChartWrapper = styled.View`
  background: ${COLORS.BASE_WHITE};
  padding: 20px 20px 0 0;
  margin: 0 10px;
`