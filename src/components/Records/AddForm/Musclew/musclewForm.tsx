import React, { useState, SetStateAction, Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../../constants/Styles'
// import components
import RecordTitle from '../title'
import MusclewRecordUnitForm from './unitForm'
import SetBtn from '../SetBtn'
import SuggestList from '../../../../common/Search/Suggests/suggestList'
// import slice
import { requestFetchSuggestRecords } from '../../../../actions/Search/suggestRecord'
// import utils
import { lessThanIphoneEightHeight } from '../../../../utilities/Device'
// import selectors
import { suggestRecordSelector } from '../../../../selectors/suggest'


interface AddMusclewProps {
  muscleName: string
  count: number
  weights: string[]
  amounts: string[]
  setCount: Dispatch<SetStateAction<number>>
  setWeights: Dispatch<SetStateAction<string[]>>
  setAmounts: Dispatch<SetStateAction<string[]>>
  setMuscleName: Dispatch<SetStateAction<string>>
}

const AddRMuscleecord = (props: AddMusclewProps) => {
  const {
    muscleName,
    count,
    weights,
    amounts,
    setCount,
    setWeights,
    setAmounts,
    setMuscleName
  } = props
  const dispatch = useDispatch()
  const [visibleSuggest, setVisibleSuggest] = useState(false)
  const { isLoading, recordNames } = suggestRecordSelector()
  const suggestSize = lessThanIphoneEightHeight() ? 165 : 190

  React.useEffect(() => {
    dispatch(requestFetchSuggestRecords(''))
  }, [])
 
  const handleOnChange = (title: string) => {
    setMuscleName(title)
    dispatch(requestFetchSuggestRecords(title))
  }

  const handleAddCount = () => {
    if (count >= 10) return
    setCount(count + 1)
  }

  const handleDeleteCount = () => {
    if (count <= 3) return
    setCount(count - 1)
  }

  const handleOnFocus = () => {
    setVisibleSuggest(true)
    if (recordNames.length) return
    dispatch(requestFetchSuggestRecords(''))
  }

  const handleOnBlur = () => {
    setVisibleSuggest(false)
  }

  const renderSuggestList =
    <SuggestListWrapper
      isShow={visibleSuggest}
      style={{ flex: 1 }} 
      behavior="padding" 
      keyboardVerticalOffset={suggestSize}
      keyboardShouldPersistTaps="always"
    >
      <SuggestList
        names={recordNames}
        isLoading={isLoading}
        handleOnChange={handleOnChange}
      />
    </SuggestListWrapper>

  return (
    <AddRecordContainer>
      <RecordTitle
        muscleName={muscleName}
        onTitleChange={handleOnChange}
        handleOnFocus={handleOnFocus}
        handleOnBlur={handleOnBlur}
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
      {renderSuggestList}
    </AddRecordContainer>
  )
}

const AddRecordContainer = styled.View`
  position: relative;
  margin: 0 auto;
  width: 90%;
  padding: 20px 0 40px 0;
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

export default AddRMuscleecord