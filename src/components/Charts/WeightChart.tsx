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
import { getLastWeekDay, getMidnightTime,  convertFirebaseTimeStamp, convertTimeStampToStringOnlyMonthAndDate } from '../../utilities/timestamp'
import { COLORS } from '../../constants/Styles'

const WeightChart = () => {
  const dispatch = useDispatch()
  const { weights, isLoading } = chartSelector()
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    dispatch(requestFetchWeights(startDate))
  }, [])

  const getRequireData = (): { weightArry: number[], dateArry: string[] } => {
    let weightArry: number[] = []
    let dateArry: string[] = []

    weights.forEach(weight => {
      weightArry.push(Number(weight.weight))
      dateArry.push(convertTimeStampToStringOnlyMonthAndDate(weight.date))
    })

    if (!weightArry.length) {
      weightArry.push(0)
      dateArry.push(convertTimeStampToStringOnlyMonthAndDate(convertFirebaseTimeStamp(new Date)))
    }

    return { weightArry: weightArry, dateArry: dateArry }
  }

  if (isLoading && !!weights.length) {
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