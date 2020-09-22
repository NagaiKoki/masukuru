import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import constants 
import { COLORS } from '../../../../constants/Styles'
// import types
import { UnitType } from '../../../../types/Record'

interface UnitFormProps {
  count: number
  amounts: UnitType[]
  weights: UnitType[]
  durations: UnitType[]
  setWeights: Dispatch<SetStateAction<UnitType[]>>
  setAmounts: Dispatch<SetStateAction<UnitType[]>>
  setDurations: Dispatch<SetStateAction<UnitType[]>>
  handleAddCount: () => void
}

const MusclewRecordUnitForm = (props: UnitFormProps) => {
  const {
    count,
    amounts,
    weights,
    durations,
    setWeights,
    setAmounts,
    setDurations,
    handleAddCount
  } = props

  const handleAddWeight = (size: number, weight: number) => {
    if (!!weights[size - 1] === undefined) {
      const addedWeights = [...weights, weight]
      return setWeights(addedWeights)
    } else {
      const weightsArry = weights.concat()
      weightsArry[size - 1] = weight
      return setWeights(weightsArry)
    }
  }

  const handleAddAmount = (size: number, amount: number) => {
    if (!!amounts[size -1] === undefined) {
      const addedAmounts = [...amounts, amount]
      return setAmounts(addedAmounts)
    } else {
      const amountsArry = amounts.concat()
      amountsArry[size - 1] = amount
      return setAmounts(amountsArry)
    }
  }

  const handleAddDuration = (size: number, duration: number) => {
    if (!!weights[size - 1] === undefined) {
      const addedDurations = [...durations, duration]
      return setDurations(addedDurations)
    } else {
      const durationArry = durations.concat()
      durationArry[size - 1] = duration
      return setDurations(durationArry)
    }
  }

  const hasSet = (countSize: number) => {
    return !!weights[countSize - 1] || !!amounts[countSize - 1] || durations[countSize - 1]
  }

  const handleOnCopy = (countSize: number) => {
    if (count >= 10 || !hasSet(countSize)) return
    const actualSet = Math.max.apply(null, [weights.length, amounts.length, durations.length])
    const amount = amounts[countSize - 1]
    const weight = weights[countSize - 1]
    const duration = durations[countSize - 1]

    const amountArray = amounts.concat()
    const weightArray = weights.concat()
    const durationArray = durations.concat()
    amountArray[actualSet] = amount
    weightArray[actualSet] = weight
    durationArray[actualSet] = duration

    setAmounts(amountArray)
    setWeights(weightArray)
    setDurations(durationArray)
    handleAddCount()
  }

  const renderUnitForms = () => {
    const components: JSX.Element[] = []
    for(let size = 1; size <= count; size++) {
      components.push(
        <AddRecordItem key={size}>
          <AddRecordName>{`${size}セット目`}</AddRecordName>
          <FormWrapper>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              defaultValue={amounts[size - 1]}
              keyboardType={'numeric'}
              autoCorrect={ false }
              returnKeyType="done"
              onChangeText={ (text: number) => handleAddAmount(size, text) }
            />
            <AddRecordUnitName>回</AddRecordUnitName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              defaultValue={weights[size - 1]}
              keyboardType={'numeric'}
              returnKeyType="done"
              autoCorrect={ false }
              onChangeText={ (text: number) => handleAddWeight(size, text) }
            />
          <AddRecordUnitName>kg</AddRecordUnitName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              defaultValue={durations[size - 1]}
              keyboardType={'numeric'}
              returnKeyType="done"
              autoCorrect={ false }
              onChangeText={ (text: number) => handleAddDuration(size, text) }
            />
          <AddRecordUnitName>秒</AddRecordUnitName>
          <CopyBtn activeOpacity={ hasSet(size) ? 0.5 : 1 } onPress={ () => handleOnCopy(size) }>
            <Icon
              name="content-copy"
              size={25}
              style={{
                opacity: hasSet(size) ? 1 : 0.4,
                color: COLORS.SUB_BLACK,
                marginLeft: 10,
              }}
            />
          </CopyBtn>
        </FormWrapper>
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
  margin-top: 15px;
  padding: 0 10px;
`

const AddRecordName = styled.Text`
  margin: 0 0 5px 5px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
`

const AddUnitForm = styled.TextInput`
  align-self: center;
  align-items: baseline;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 17%;
  height: 45px;
  margin: 10px 0;
  margin-right: 8px;
  padding: 10px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`

const AddRecordUnitName = styled.Text`
  margin-right: 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const FormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`

const CopyBtn = styled.TouchableOpacity`
`