import React, { useState } from 'react';
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'
import Icon from 'react-native-vector-icons/AntDesign';

interface AddRecordFormProps {
  temporaryName: string,
  temporarySet: number,
  onChangeTrainingName: (name: string) => void
  onChangeSetCount: (payload: number) => void
}

const AddRecordForm = (props: AddRecordFormProps) => {
  const [count, setCount] = useState(3)
  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)
  const [amount3, setAmount3] = useState(0)
  const [weight1, setWeight1] = useState(0)
  const [weight2, setWeight2] = useState(0)
  const [weight3, setWeight3] = useState(0)
  const { 
    temporaryName,
    temporarySet,
    onChangeTrainingName, 
    onChangeSetCount 
  } = props

  const handleOnChangeName = (name: string) => {
    onChangeTrainingName(name)
  }

  const handleOnChangeSet = (set: number) => {
    onChangeSetCount(set)
  }

  const handleSetAmount = (size: number, number: number) => {
    eval("setAmount" + size + `(${number})`)
  }

  const handleSetWeight = (size: number, number: number) => {
    eval("setWeight" + size + `(${number})`)
  }

  const handleAddSet = () => [
    setCount( count + 1 )
  ]

  const handleDeleteSet = () => {
    if (count <= 1) return
    setCount( count - 1 )
  }

  const renderUnitForm = () => {
    const components = []
    for(let size = 1; size <= count; size++) {
      components.push(
        <AddRecordItem key={size}>
          <AddRecordName>{`${size}セット目`}</AddRecordName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={1}
              keyboardType={'numeric'}
              autoCorrect={ false }
              onChangeText={ (text: number) => handleSetAmount(size, text) }
          />
          <AddRecordUnitName>/ 回</AddRecordUnitName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={1}
              keyboardType={'numeric'}
              autoCorrect={ false }
              onChangeText={ (text: number) => handleSetWeight(size, text) }
          />
        <AddRecordUnitName>/ kg</AddRecordUnitName>
      </AddRecordItem>
      )
    }
    return components
  }

  return (
    <AddRecordWrapper>
      <AddRecordItem>
        <AddRecordName>種目</AddRecordName>
        <TrainingNameForm
          placeholder="例）ベンチプレス"
          autoCapitalize={'none'}
          autoCorrect={ false }
          defaultValue={temporaryName}
          onChangeText={ (text: string) => handleOnChangeName(text) }
        />
      </AddRecordItem>
      {renderUnitForm()}
      <AddSetWrapper>
        <AddSetText>セット数</AddSetText>
        <AddSetBtn onPress={handleAddSet}>
          <Icon name="plus" size={20} style={{ color: COLORS.SUB_BLACK, marginRight: 10 }} />
        </AddSetBtn>
        <AddSetBtn onPress={handleDeleteSet}>
          <Icon name="minus" size={20} style={{ color: COLORS.SUB_BLACK }} />
        </AddSetBtn>
      </AddSetWrapper>
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
  width: 15%;
  margin: 10px 0;
  margin-right: 10px;
  padding: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const TrainingNameForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 65%;
  margin: 8px 0;
  padding: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const AddSetWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`

const AddSetText = styled.Text`
  margin-right: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const AddSetBtn = styled.TouchableOpacity`
`

export default AddRecordForm