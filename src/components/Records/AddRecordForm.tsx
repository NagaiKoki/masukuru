import React from 'react';
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'

interface AddRecordFormProps {
  onChangeTrainingName: (name: string) => void
}

const AddRecordForm = (props: AddRecordFormProps) => {
  const { onChangeTrainingName } = props

  const handleOnChange = (name: string) => {
    onChangeTrainingName(name)
  }

  return (
    <AddRecordWrapper>
      <AddRecordItem>
        <AddRecordName>種目</AddRecordName>
        <TrainingNameForm
          placeholder="例）ベンチプレス"
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ (text: string) => handleOnChange(text) }
        />
      </AddRecordItem>
    </AddRecordWrapper>
  )
}

const AddRecordWrapper = styled.View`
  margin: 0 auto;
  width: 90%;
  padding: 20px 0;
`

const AddRecordItem = styled.View`
  flex-direction: row;
  align-items: center;
`

const AddRecordName = styled.Text`
  width: 15%;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
`

const TrainingNameForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 85%;
  margin: 10px 0;
  padding: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

export default AddRecordForm