import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../../constants/Styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import components
import AddRecordForm from '../../../components/Records/AddRecordForm'
import AddRecordAeroForm from '../../../components/Records/AddRecordAreroForm'
import Toast from '../../../components/Toaster'
// import types
import { AddRecordProps } from '../../../containers/addRecord'
// import constants
import { RECORD_ERROR_MESSAGE } from '../../../constants/errorMessage'
import { RecordItemType } from '../../../types/Record';

const AddRecordScreen = (props: AddRecordProps) => {
  const { 
    actions,
    records,
    navigation,
    route
  } = props
  const { 
    addRecord, 
    updateRecord, 
    setRecordError, 
    onChangeTrainingName,
    onChangeDistance,
    onChangeTime
  } = actions
  const { 
    recordItems, 
    temporaryName, 
    error, 
    temporaryTime, 
    temporaryDistance, 
  } = records
  const { recordItem, isUpdate, isMuscle } = route.params

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
  const [isMuscleMenu, SetIsMuscleMenu] = useState(true)
  
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
            { return (
              isUpdate ?  
              <HeaderSaveBtn onPress={ () => onSubmitRecord() }>
                <HeaderSaveTitle>更新する</HeaderSaveTitle>
              </HeaderSaveBtn> 
            : <HeaderSaveBtn onPress={ () => onSubmitRecord() }>
                <HeaderSaveTitle>追加する</HeaderSaveTitle>
              </HeaderSaveBtn>
            )  
          }
        },
      })
    }, [
        // 初回マウント時点の変数がcallback関数内で使われるので、以下の変数に変更があるたびに関数を呼び出す
        temporaryName, 
        temporaryDistance,
        temporaryTime,
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

  useFocusEffect(
    useCallback(() => {
      reSetUnit()
      if (typeof isMuscle === 'boolean') {
        SetIsMuscleMenu(isMuscle)
      }
    }, [])
  )

  const reSetUnit = () => {
    if (isUpdate && isMuscle) {
      for(let size = 1; size <= recordItem.amounts.length; size++) {
        eval('setAmount' + size + `(${recordItem.amounts[size - 1]})`)
      }
      for(let size = 1; size <= recordItem.weights.length; size++) {
        const weight = recordItem.weights.length ? recordItem.weights[size - 1] : 0
        return eval('setWeight' + size + `(${weight})`)
      }
    }
  }

  // エラーの削除
  const handleErrorClear = () => {
    setRecordError('')
  }

  // 重さと回数を配列にまとめる
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

  // 記録の追加 or 更新
  const onSubmitRecord = () => {
    let record: RecordItemType
    if (!temporaryName) {
      return setRecordError(RECORD_ERROR_MESSAGE.EMPTY_NAME)
    }
    if (isMuscleMenu && !amount1) {
      return setRecordError(RECORD_ERROR_MESSAGE.EMPTY_AMOUNT)
    }

    console.log(temporaryDistance)
    console.log(temporaryTime)

    if (!isMuscleMenu && (!temporaryDistance || !temporaryTime)) {
      return setRecordError(RECORD_ERROR_MESSAGE.EMPTY_TIME_OR_DISTANCE)
    }
    if (isMuscleMenu) {
      const { amountArry, weightArry } = convertToArry()
      record = {
        id:  isUpdate ? recordItems.length : recordItems.length + 1,
        name: temporaryName,
        set: amountArry.length,
        amounts: amountArry,
        weights: weightArry, 
        isMuscle: true
      }
    } else {
      record = {
        id: isUpdate ? recordItems.length : recordItems.length + 1,
        name: temporaryName,
        time: temporaryTime,
        distance: temporaryDistance,
        isMuscle: false
      }
    }
    isUpdate ? updateRecord(record) : addRecord(record)
    navigation.goBack()
  }

  // トレーニング対象の切り替え
  const handleToggleRecord = () => {
    if (isMuscleMenu) {
      SetIsMuscleMenu(false)
    } else {
      SetIsMuscleMenu(true)
    }
  }

  return (
    <AddRecordContainer>
      <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={120}
        contentContainerStyle={style.container}
        scrollEnabled={false}
      >
      <Toast
        message={error}
        onDismiss={handleErrorClear}
      />
      <RecordSwitchWrapper>
        <RecordMuscleBtn isMuscle={isMuscleMenu} onPress={handleToggleRecord}>
          <RecordMuscleText isMuscle={isMuscleMenu}>筋トレ</RecordMuscleText>
        </RecordMuscleBtn>
        <RecordAeroBtn isMuscle={isMuscleMenu} onPress={handleToggleRecord}>
          <RecordAeroText isMuscle={isMuscleMenu}>有酸素運動</RecordAeroText>
        </RecordAeroBtn>
      </RecordSwitchWrapper>

      { isMuscleMenu ?
        <AddRecordForm
          amount1={amount1}
          amount2={amount2}
          amount3={amount3}
          amount4={amount4}
          amount5={amount5}
          amount6={amount6}
          amount7={amount7}
          amount8={amount8}
          amount9={amount9}
          weight1={weight1}
          weight2={weight2}
          weight3={weight3}
          weight4={weight4}
          weight5={weight5}
          weight6={weight6}
          weight7={weight7}
          weight8={weight8}
          weight9={weight9}
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
      /> : 
        <AddRecordAeroForm
          temporaryName={temporaryName}
          temporaryDistance={temporaryDistance}
          temporaryTime={temporaryTime}
          onChangeTrainingName={onChangeTrainingName}
          onChangeDistance={onChangeDistance}
          onChangeTime={onChangeTime}
        />
      }
      </KeyboardAwareScrollView>    
    </AddRecordContainer>
  )
}

export default AddRecordScreen

const style = StyleSheet.create({
  container: {
    marginTop: 30
  }
})

const AddRecordContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 0px;
`

const HeaderSaveBtn = styled.TouchableOpacity`
`

const HeaderSaveTitle = styled.Text`
  margin-right: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_WHITE};
`

const RecordSwitchWrapper = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin: 20px 0;
`

const RecordMuscleBtn = styled.TouchableOpacity<{ isMuscle: boolean }>`
  align-self: center;
  width: 30%;
  border-radius: 20px;
  margin: 0 10px;
  padding: 10px 0;
  background-color: ${props => props.isMuscle ? COLORS.BASE_MUSCLEW : COLORS.FORM_BACKGROUND};
`

const RecordMuscleText = styled.Text<{ isMuscle: boolean }>`
  text-align: center;
  color: ${props => props.isMuscle ? COLORS.BASE_WHITE : COLORS.BASE_BLACK};
  font-weight: ${props => props.isMuscle ? 'bold' : 'normal'};
`

const RecordAeroBtn = styled.TouchableOpacity<{ isMuscle: boolean }>`
  width: 30%;
  align-self: center;
  border-radius: 20px;
  padding: 10px 0;
  margin: 0 10px;
  background-color: ${props => !props.isMuscle ? COLORS.BASE_MUSCLEW : COLORS.FORM_BACKGROUND};
`

const RecordAeroText = styled.Text<{ isMuscle: boolean }>`
  text-align: center;
  color: ${props => !props.isMuscle ? COLORS.BASE_WHITE : COLORS.BASE_BLACK};
  font-weight: ${props => !props.isMuscle ? 'bold' : 'normal'};
`