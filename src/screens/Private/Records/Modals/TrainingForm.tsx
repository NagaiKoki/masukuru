import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../../../constants/Styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import components
import AddRecordAeroForm from '../../../../components/Records/AddForm/areroForm'
import MuscleForm from '../../../../components/Records/AddForm/Musclew/musclewForm'
import Toast from '../../../../components/Toaster'
// import types
import { RecordItemType } from '../../../../types/Record'
// import constants
import { RECORD_ERROR_MESSAGE } from '../../../../constants/errorMessage'
// import slice
import { addRecord, updateRecord } from '../../../../slice/record'
import recordSelector from '../../../../selectors/record'

const AddRecordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { recordItems } = recordSelector()
  const { isUpdate, isMuscle } = route.params

  const [count, setCount] = useState(3)
  const [weights, setWeights] = useState(['', '', ''])
  const [amounts, setAmounts] = useState(['', '', ''])
  const [muscleName, setMuscleName] = useState('')
  const [error, setError] = useState('')
  const [isMuscleMenu, setIsMuscleMenu] = useState(isMuscle || true)
  
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: '記録を追加する',
        headerStyle: {
          backgroundColor: COLORS.BASE_MUSCLEW
        },
        headerTintColor: COLORS.BASE_WHITE,
        headerBackTitleVisible: false,
        headerRight: () => {{ 
          return (
              <HeaderSaveBtn onPress={ () => handleOnSubmit() }>
                <HeaderSaveTitle>{ isUpdate ? '更新する' : '追加する' }</HeaderSaveTitle>
              </HeaderSaveBtn> 
            )
          }
        },
      })
      // 初回マウント時点の変数がcallback関数内で使われるので、以下の変数に変更があるたびに関数を呼び出す
    }, [count, weights, amounts, muscleName]
  ))

  // エラーの削除
  const handleErrorClear = () => {
    setError('')
  }

  // トレーニング対象の切り替え
  const handleToggleRecord = () => {
    isMuscleMenu ? setIsMuscleMenu(true) : setIsMuscleMenu(false)
  }

  const handleOnSubmit = () => {
    if (!muscleName) {
      return setError(RECORD_ERROR_MESSAGE.EMPTY_NAME)
    } else if (isMuscleMenu && !amounts.filter(Boolean).length) {
      return setError(RECORD_ERROR_MESSAGE.EMPTY_AMOUNT)
    } else if (!isMuscleMenu) {
      return setError(RECORD_ERROR_MESSAGE.EMPTY_TIME_OR_DISTANCE)
    }
    const recordItem: RecordItemType  = {
      id: parseInt(`${new Date().getTime()}${recordItems.length}, 10`),
      name: muscleName,
      set: count || undefined,
      amounts: !!amounts.length ? amounts : [],
      weights: !!weights.length ? weights : [],
      time: 1,
      distance: 1,
      recordType: isMuscleMenu ? 'muscle' : 'Aerobic'
    }
    dispatch(addRecord(recordItem))
    navigation.goBack()
  }

  const renderSwitchBtn =
    <RecordSwitchWrapper>
      <RecordMuscleBtn isMuscle={isMuscleMenu} onPress={handleToggleRecord}>
        <RecordMuscleText isMuscle={isMuscleMenu}>筋トレ</RecordMuscleText>
      </RecordMuscleBtn>
      <RecordAeroBtn isMuscle={isMuscleMenu} onPress={handleToggleRecord}>
        <RecordAeroText isMuscle={isMuscleMenu}>有酸素運動</RecordAeroText>
      </RecordAeroBtn>
    </RecordSwitchWrapper>
  
  const renderForm = isMuscleMenu ?
    <MuscleForm 
      muscleName={muscleName}
      count={count}
      weights={weights}
      amounts={amounts}
      setCount={setCount}
      setWeights={setWeights}
      setAmounts={setAmounts}
      setMuscleName={setMuscleName}
    /> : null

  return (
    <AddRecordContainer keyboardShouldPersistTaps="always">
      <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={120}
        contentContainerStyle={style.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
      >
      <Toast message={error} onDismiss={handleErrorClear} />
      {renderSwitchBtn}
      {renderForm}
      </KeyboardAwareScrollView>    
    </AddRecordContainer>
  )
}

export default AddRecordScreen

const style = StyleSheet.create({
  container: {
    marginTop: 20
  }
})

const AddRecordContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND}; 
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
  margin: 25px 0 20px 0;
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