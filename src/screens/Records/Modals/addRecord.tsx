import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../../constants/Styles'
// import components
import AddRecordForm from '../../../components/Records/AddRecordForm'
import Toast from '../../../components/Toaster'
// import types
import { AddRecordProps } from '../../../containers/addRecord'
// import constants
import { RECORD_ERROR_MESSAGE } from '../../../constants/errorMessage'

const AddRecordScreen = (props: AddRecordProps) => {
  const { 
    actions, 
    records,
    navigation 
  } = props
  const { addRecord, setRecordError, onChangeTrainingName } = actions
  const { recordItems, temporaryName, error } = records

  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)
  const [amount3, setAmount3] = useState(0)
  const [amount4, setAmount4] = useState(0)
  const [amount5, setAmount5] = useState(0)
  const [amount6, setAmount6] = useState(0)
  const [amount7, setAmount7] = useState(0)
  const [amount8, setAmount8] = useState(0)
  const [amount9, setAmount9] = useState(0)
  const [weight1, setWeight1] = useState(0)
  const [weight2, setWeight2] = useState(0)
  const [weight3, setWeight3] = useState(0)
  const [weight4, setWeight4] = useState(0)
  const [weight5, setWeight5] = useState(0)
  const [weight6, setWeight6] = useState(0)
  const [weight7, setWeight7] = useState(0)
  const [weight8, setWeight8] = useState(0)
  const [weight9, setWeight9] = useState(0)
  
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: '記録を追加する',
        headerStyle: {
          backgroundColor: COLORS.BASE_MUSCLEW
        },
        headerTintColor: COLORS.BASE_WHITE,
        headerBackTitleVisible: false,
        headerRight: () => {
          return (
            <HeaderSaveBtn onPress={ () => onSubmitRecord() }>
              <HeaderSaveTitle>追加する</HeaderSaveTitle>
            </HeaderSaveBtn>
          )
        },
      })
    }, [
        // 初回マウント時点の変数がcallback関数内で使われるので、以下の変数に変更があるたびに関数を呼び出す
        temporaryName, 
        amount1,
        amount2,
        amount3,
        amount4,
        amount5,
        amount6,
        amount7,
        amount8,
        amount9,
        weight1,
        weight2,
        weight3,
        weight4,
        weight5,
        weight6,
        weight7,
        weight8,
        weight9,
      ]
    )
  )

  // エラーの削除
  const handleErrorClear = () => {
    setRecordError('')
  }

  const convertToArry = () => {
    const amountArry = []
    const weightArry = []
    for(let size = 1; size <= 9; size++) {
      const amount: number = eval('amount' + size)
      const weight: number = eval('weight' + size)
      if (!amount || amount === 0) break
      amountArry.push(amount)
      weightArry.push(weight)
    }
    return { amountArry, weightArry }
  }

  const onSubmitRecord = () => {
    if (!temporaryName) {
      return setRecordError(RECORD_ERROR_MESSAGE.EMPTY_NAME)
    }
    if (!amount1) {
      return setRecordError(RECORD_ERROR_MESSAGE.EMPTY_AMOUNT)
    }
    const { amountArry, weightArry } = convertToArry()
    const records = {
      id: recordItems.length + 1,
      name: temporaryName,
      set: amountArry.length,
      amounts: amountArry,
      weights: weightArry, 
    }
    addRecord(records)
    navigation.goBack()
  }

  return (
    <AddRecordContainer>
      <Toast
        message={error}
        onDismiss={handleErrorClear}
      />
      <AddRecordForm
        temporaryName={temporaryName}
        onChangeTrainingName={onChangeTrainingName}
        setAmount1={setAmount1}
        setAmount2={setAmount2}
        setAmount3={setAmount3}
        setAmount4={setAmount4}
        setAmount5={setAmount5}
        setAmount6={setAmount6}
        setAmount7={setAmount7}
        setAmount8={setAmount8}
        setAmount9={setAmount9}
        setWeight1={setWeight1}
        setWeight2={setWeight2}
        setWeight3={setWeight3}
        setWeight4={setWeight4}
        setWeight5={setWeight5}
        setWeight6={setWeight6}
        setWeight7={setWeight7}
        setWeight8={setWeight8}
        setWeight9={setWeight9}
      />
    </AddRecordContainer>    
  )
}

export default AddRecordScreen

const AddRecordContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 30px;
`

const HeaderSaveBtn = styled.TouchableOpacity`
`

const HeaderSaveTitle = styled.Text`
  margin-right: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_WHITE};
`