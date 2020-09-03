import React, { useState } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../../constants/Styles'
// import components
import RecordTitle from '../title'
import MusclewRecordUnitForm from './unitForm'
import SetBtn from '../SetBtn'
// import types
import { WeightType, AmountType } from '../../../../types/Record'

const AddRecord2 = () => {
  const [count, setCount] = useState(3)
  const [weights, setWeights] = useState<WeightType[]>(['', '', ''])
  const [amounts, setAmounts] = useState<AmountType[]>(['', '', ''])
  const [title, setTitle] = useState('')

  const handleOnTItleChange = (title: string) => {
    return setTitle(title)
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

export default AddRecord2