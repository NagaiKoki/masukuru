import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { RecordItemType } from '../../../types/Record'

interface RecordDataProps {
  record: RecordItemType
}

const RecordData = (props: RecordDataProps) => {
  const { record } = props

  const components = () => {
    if (record.isMuscle) {
      const amounts = record.amounts
      const weights = record.weights
      let components = []
      for(let size = 1; size <= amounts.length; size++) {
         components.push(<UnitData key={size}>{ amounts[size - 1] ? amounts[size - 1] + '回' : null }{ weights[size - 1] ? '×' + weights[size - 1] + 'kg' : null}</UnitData>)
      }
      return components
    } else if (record.isMuscle === false) {
      const time = record.time
      const distance = record.distance
      return (
        <UnitDataItem>
          <UnitData>{time ? time + '分' : null}</UnitData>
          <UnitData>{distance ? distance + 'km' : null}</UnitData>
        </UnitDataItem>
      )
    }
  }

  return (
    <React.Fragment>
      {components()}
    </React.Fragment>
  )
}

const UnitDataItem = styled.View`
`

const UnitData = styled.Text`
  padding: 5px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  margin-right: 10px;
`

export default RecordData