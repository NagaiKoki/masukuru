import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
// import constants 
import { COLORS } from '../../../../constants/Styles'
// import types
import { WeightType, AmountType } from '../../../../types/Record'

interface UnitFormProps {
  count: number
  amounts: AmountType[]
  weights: WeightType[]
  setWeights: Dispatch<SetStateAction<WeightType[]>>
  setAmounts: Dispatch<SetStateAction<AmountType[]>>
}

const MusclewRecordUnitForm = (props: UnitFormProps) => {
  const { count, amounts, weights, setWeights, setAmounts } = props

  const handleAddWeight = (size: number, weight: number | string) => {
    if (weights[size - 1] === undefined) {
      const addedWeights = [...weights, weight]
      return setWeights(addedWeights)
    } else {
      weights[size - 1] = weight
      return setWeights(weights)
    }
  }

  const handleAddAmount = (size: number, amount: number | string) => {
    if (!!amounts[size -1] === undefined) {
      const addedAmounts = [...amounts, amount]
      return setAmounts(addedAmounts)
    } else {
      amounts[size - 1] = amount
      return setAmounts(amounts)
    }
  }

  const renderUnitForms = () => {
    const components: JSX.Element[] = []
    for(let size = 1; size <= count; size++) {
      components.push(
        <AddRecordItem key={size}>
          <AddRecordName>{`${size}セット目`}</AddRecordName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              // defaultValue={amounts[size - 1]}
              keyboardType={'numeric'}
              autoCorrect={ false }
              returnKeyType="done"
              onChangeText={ (text: number) => handleAddAmount(size, text) }
          />
          <AddRecordUnitName>/ 回</AddRecordUnitName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              // defaultValue={weights[size - 1]}
              keyboardType={'numeric'}
              returnKeyType="done"
              autoCorrect={ false }
              onChangeText={ (text: number) => handleAddWeight(size, text) }
          />
        <AddRecordUnitName>/ kg</AddRecordUnitName>
      </AddRecordItem>
      )
    }
    return components
  }

  return (
    <React.Fragment>
      {renderUnitForms()}
    </React.Fragment>
  )
}

export default MusclewRecordUnitForm

const AddRecordItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

const AddRecordName = styled.Text`
  width: 20%;
  margin-right: 25px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
  text-align: right;
`

const AddRecordUnitName = styled.Text`
  margin-right: 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const AddUnitForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 17%;
  height: 50px;
  margin: 10px 0;
  margin-right: 10px;
  padding: 15px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`