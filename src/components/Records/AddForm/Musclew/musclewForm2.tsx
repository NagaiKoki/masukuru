import React, { useState, SetStateAction, Dispatch } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../../constants/Styles'
// import components
import RecordTitle from '../title'
import MusclewRecordUnitForm from './unitForm'
import SetBtn from '../SetBtn'
// import types
import { WeightType, AmountType } from '../../../../types/Record'

interface AddMusclewProps {
  count: number
  weights: string[]
  amounts: string[]
  musclewName: string
  setCount: Dispatch<SetStateAction<number>>
  setWeights: Dispatch<SetStateAction<string[]>>
  setAmounts: Dispatch<SetStateAction<string[]>>
  setMuscleName: Dispatch<SetStateAction<string>>
}

const AddRMuscleecord = (props: AddMusclewProps) => {
  const {
    count,
    weights,
    amounts,
    musclewName,
    setCount,
    setWeights,
    setAmounts,
    setMuscleName
  } = props
 
  const handleOnTItleChange = (title: string) => {
    return setMuscleName(title)
  }

  const handleAddCount = () => {
    if (count >= 10) return
    setCount(count + 1)
  }

  const handleDeleteCount = () => {
    if (count <= 3) return
    setCount(count - 1)
  }

  return (
    <AddRecordContainer>
      <RecordTitle
        onTitleChange={handleOnTItleChange}
      />
      <MusclewRecordUnitForm 
        count={count}
        amounts={amounts}
        weights={weights}
        setWeights={setWeights}
        setAmounts={setAmounts}
      />
      <SetBtn 
        handleAddSet={handleAddCount}
        handleDeleteSet={handleDeleteCount}
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

export default AddRMuscleecord