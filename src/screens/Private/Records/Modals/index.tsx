import React, { useCallback } from 'react';
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
import { deleteRecord, onChangeRecordDate } from '../../../../slice/record'
// import selectors
import recordSelector from '../../../../selectors/record' 

export type RecordNavigationType = {
  isUpdate: boolean
  recordItem?: RecordItemType
}

const RecordModalScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { recordItems, trainingDate } = recordSelector()

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

  // 一言画面へ遷移
  const handleNavigationWord = () => {
    navigation.navigate('tweetRecordModal', { isEdit: false })
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
  
  // 記録の編集フォームへ移動
  const handleUpdateRecordItme = (record: RecordItemType) => {
    const routeProps: RecordNavigationType = {
      recordItem: record,
      isUpdate: true
    }
    navigation.navigate('trainingRecordModal', routeProps)
  }

  const handleOnChangeDate = (date: Date) => {
    dispatch(onChangeRecordDate(date))
  }

  return (
    <RecordModalContainer >
      <Wrapper>
        <TitleLabel>日付</TitleLabel>
        <DatePicker 
          date={trainingDate}
          handleOnChangeDate={handleOnChangeDate}
        />
      </Wrapper>
      <Wrapper>
      <TitleLabel>トレーニング</TitleLabel>
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
  padding: 15px 0;
`

const TitleLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding: 0 20px 10px 0;
  font-size: 18px;
  font-weight: bold;
`

