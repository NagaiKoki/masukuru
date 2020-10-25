import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles';
// import types
import { RecordItemType } from '../../../../types/Record'
// import components
import DatePicker from '../../../../common/Date'
import DefaultAddButton from '../../../../components/Records/AddForm/AddedList/DefaultAddButton'
import AddedList from '../../../../components/Records/AddForm/AddedList/List'
// import slices
import { deleteRecord, requestFetchRecord, onChangeRecordDate } from '../../../../slice/record'
// import selectors
import recordSelector from '../../../../selectors/record' 

export type RecordNavigationType = {
  isUpdate: boolean
  recordItem?: RecordItemType
}

const RecordModalScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { recordId } = route.params
  const { recordItems, trainingDate, isLoading } = recordSelector() 
  
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => {
          return (
            <HeaderNextBtn onPress={handleNavigationWord}>
              <HeaderNextTitle>{ !recordItems.length ? 'skip' : '次へ' }</HeaderNextTitle>
            </HeaderNextBtn>
          )
        }
      })
    }, [recordItems])
  )
  
  useEffect(() => {
    dispatch(requestFetchRecord(recordId))
  }, [])

  if (isLoading) {
    return <></>
  }

  // 一言画面へ遷移
  const handleNavigationWord = () => {
    navigation.navigate('tweetRecordModal', { isEdit: true, recordId })
  }
  
  // 記録フォームへ遷移
  const handleNavigateAddForm = () => {
    const routeProps: RecordNavigationType = {
      isUpdate: false
    }
    navigation.navigate('trainingRecordModal', routeProps)
  }

  const handleDispatchDeleteTraining = (record: RecordItemType) => {
    dispatch(deleteRecord(record))
  }
  
  // 記録の削除
  const handleDeleteRecordItem = (record: RecordItemType) => {
    handleDispatchDeleteTraining(record)
  }

  const handleOnChangeDate = (date: Date) => {
    dispatch(onChangeRecordDate(date))
  }
  
  // 記録の編集フォームへ移動
  const handleUpdateRecordItme = (record: RecordItemType) => {
    const editableWeights = record.weights.map(weight => String(weight)).filter(Boolean)
    const editableAmounts = record.amounts.map(amount => String(amount)).filter(Boolean)
    const editableRecord = {
      ...record,
      weights: editableWeights,
      amounts: editableAmounts
    }
    const routeProps: RecordNavigationType = {
      recordItem: editableRecord,
      isUpdate: true
    }
    navigation.navigate('trainingRecordModal', routeProps)
  }

  return (
    <RecordModalContainer>
      <Wrapper>
        <TitleWrapper>
          <TitleSquare />
          <TitleLabel>日付</TitleLabel>
        </TitleWrapper>
        <DatePicker 
          date={trainingDate}
          handleOnChangeDate={handleOnChangeDate}
        />
      </Wrapper>
      <Wrapper>
        <TitleWrapper>
          <TitleSquare />
          <TitleLabel>トレーニング</TitleLabel>
        </TitleWrapper>
        <AddedList 
          recordItems={recordItems}
          onNavigate={handleUpdateRecordItme}
          onDelete={handleDeleteRecordItem}
        />
        <DefaultAddButton onPress={handleNavigateAddForm} />
      </Wrapper>
    </RecordModalContainer>
  )
}

export default RecordModalScreen;

const RecordModalContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 20px 15px;
`

const HeaderNextBtn = styled.TouchableOpacity`
`

const HeaderNextTitle = styled.Text`
  margin-right: 15px;
  font-size: 18px;
  color: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 20px 0;
`

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px 10px 0;
`

const TitleSquare = styled.View`
  border-radius: 3px;
  margin-right: 7px;
  width: 15px;
  height: 15px;
  background: ${COLORS.BASE_MUSCLEW};
`

const TitleLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
`