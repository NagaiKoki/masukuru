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
import { hapticFeedBack } from '../../../../utilities/Haptic'
// import selectors
import { suggestRecordSelector } from '../../../../selectors/suggest'


interface AddMusclewProps {
  muscleName: string
  count: number
  weights: string[]
  amounts: string[]
  durations: string[]
  setCount: Dispatch<SetStateAction<number>>
  setWeights: Dispatch<SetStateAction<string[]>>
  setAmounts: Dispatch<SetStateAction<string[]>>
  setDurations: Dispatch<SetStateAction<string[]>>
  setMuscleName: Dispatch<SetStateAction<string>>
}

const AddRMuscleecord = (props: AddMusclewProps) => {
  const {
    muscleName,
    count,
    weights,
    amounts,
    durations,
    setCount,
    setWeights,
    setAmounts,
    setDurations,
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
    hapticFeedBack('medium')
    setCount(count + 1)
  }

  const handleDeleteCount = () => {
    if (count <= 1) return
    hapticFeedBack('medium')
    // セット数と実際に入力した値で換算されるセット数にズレがある場合、実際のセット数に合わせる
    const length = Math.max.apply(null, [amounts.length, weights.length, durations.length])
    if (count !== length) {
      return setCount(length)
    }
    setAmounts(amounts.slice(0, amounts.length - 1))
    setWeights(weights.slice(0, weights.length - 1))
    setDurations(durations.slice(0, durations.length - 1))
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
        handleOnBlur={handleOnBlur}
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
        durations={durations}
        setWeights={setWeights}
        setAmounts={setAmounts}
        setDurations={setDurations}
        setCount={setCount}
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