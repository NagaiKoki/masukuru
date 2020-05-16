import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'

interface AddAeroProps {
  temporaryName: string
  temporaryDistance: number
  temporaryTime: number
  onChangeTrainingName: (name: string) => void
  onChangeDistance: (distance: number) => void
  onChangeTime: (time: number) => void
}

const AddRecordAeroForm = (props: AddAeroProps) => {
  const { temporaryName, temporaryDistance, temporaryTime, onChangeTime, onChangeDistance, onChangeTrainingName } = props

  return (
    <AddAeroWrapper>
      <AddRecordItem>
        <AddRecordName>種目</AddRecordName>
        <TrainingNameForm
          placeholder="例）ベンチプレス"
          autoCapitalize={'none'}
          autoCorrect={ false }
          defaultValue={temporaryName}
          onChangeText={ (text: string) => onChangeTrainingName(text) }
        />
      </AddRecordItem>
      <AddRecordItem>
        <AddRecordName>距離</AddRecordName>
        <AddUnitForm
          placeholder="0"
          autoCapitalize={'none'}
          maxLength={3}
          defaultValue={String(temporaryDistance)}
          keyboardType={'numeric'}
          autoCorrect={ false }
          onChangeText={ (text: number) => onChangeDistance(text) }
        />
        <AddRecordUnitName> km</AddRecordUnitName>
      </AddRecordItem>
      <AddRecordItem>
        <AddRecordName>時間</AddRecordName>
        <AddUnitForm
          placeholder="0"
          autoCapitalize={'none'}
          maxLength={3}
          defaultValue={String(temporaryTime)}
          keyboardType={'numeric'}
          autoCorrect={ false }
          onChangeText={ (text: number) => onChangeTime(text) }
        />
        <AddRecordUnitName> 分</AddRecordUnitName>
      </AddRecordItem>
    </AddAeroWrapper>
  )

}

const AddAeroWrapper = styled.View` 
  margin: 0 auto;
  width: 90%;
  padding: 20px 0 40px 0;
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

const TrainingNameForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 70%;
  margin: 8px 0;
  padding: 15px;
  font-size: 15px;
  color: ${COLORS.BASE_BLACK};
`

const AddUnitForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 17%;
  margin: 10px 0;
  margin-right: 10px;
  padding: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

export default AddRecordAeroForm;