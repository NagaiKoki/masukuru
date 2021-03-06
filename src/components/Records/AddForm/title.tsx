import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'

interface RecordTitleProps {
  muscleName: string
  onTitleChange: (title: string) => void
  handleOnBlur: () => void
  handleOnFocus: () => void
}

const RecordTitle = (props: RecordTitleProps) => {
  const { muscleName, onTitleChange, handleOnBlur, handleOnFocus } = props

  const renderTitleForm =
    <AddRecordItem>
      <AddRecordName>種目</AddRecordName>
      <TrainingFormWrapper>
        <TrainingNameForm
          placeholder="例）ベンチプレス"
          autoCapitalize={'none'}
          autoCorrect={ false }
          returnKeyType="done"
          clearButtonMode='always'
          value={muscleName}
          onChangeText={ (text: string) => onTitleChange(text) }
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </TrainingFormWrapper>
    </AddRecordItem>

  return (
    renderTitleForm
  )
}

export default RecordTitle

const AddRecordItem = styled.View`
  padding: 0 10px;
`

const AddRecordName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`
const TrainingFormWrapper = styled.View`
  position: relative;
  margin-left: 5px;
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