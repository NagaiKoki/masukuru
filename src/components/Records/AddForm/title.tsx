import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'

interface RecordTitleProps {
  onTitleChange: (title: string) => void
}

const RecordTitle = (props: RecordTitleProps) => {
  const { onTitleChange } = props

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
          onChangeText={ (text: string) => onTitleChange(text) }
        />
      </TrainingFormWrapper>
    </AddRecordItem>

  return (
    renderTitleForm
  )
}

export default RecordTitle

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