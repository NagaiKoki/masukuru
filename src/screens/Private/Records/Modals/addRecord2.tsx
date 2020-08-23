import React, { useState } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../../constants/Styles'
// import components
import RecordTitle from '../../../../components/Records/AddForm/title'

type WeightType = {
  weight: number | string
}

type AmountType = {
  amount: number | string
}

const AddRecord2 = () => {
  const [count, setCount] = useState(3)
  const [weights, setWeights] = useState<WeightType[]>([])
  const [amounts, setAmounts] = useState<AmountType[]>([])
  const [title, setTitle] = useState('')

  const handleOnTItleChange = (title: string) => {
    return setTitle(title)
  }

  return (
    <AddRecordContainer>
      <RecordTitle
        onTitleChange={handleOnTItleChange}
      />
    </AddRecordContainer>
  )
}

const AddRecordContainer = styled.View`
  position: relative;
  margin: 0 auto;
  width: 90%;
  padding: 20px 0 40px 0;
`

const AddRecordWrapper = styled.View`
`

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

const TrainingFormWrapper = styled.View`
  width: 70%;
  position: relative;
`

const TrainingNameForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin: 8px 0;
  padding: 15px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`

const SuggestListWrapper = styled.KeyboardAvoidingView<{ isShow: boolean }>`
  display: ${props => props.isShow ? 'flex' : 'none'};
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${COLORS.BASE_WHITE};
`