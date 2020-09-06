import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native'
// import types
import { RecordItemType } from '../../../../types/Record'
// import lib
import truncateText from '../../../../utilities/truncateText'
// import components
import DatePicker from '../../../../common/Date'
// import slices
import { deleteRecord, requestFetchRecord } from '../../../../slice/record'
// import selectors
import recordSelector from '../../../../selectors/record' 
// import utils
import { parseRecord } from '../../../../utilities/Record/recordParse'

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
              <HeaderNextTitle>次へ</HeaderNextTitle>
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
    return <React.Fragment />
  }

  // 一言画面へ遷移
  const handleNavigationWord = () => {
    if (!recordItems.length) {
      Alert.alert('トレーニングを追加してください。')
    } else {
      navigation.navigate('tweetRecordModal', { isEdit: true, recordId: recordId })
    }
  }
  
  // 記録フォームへ遷移
  const handleNavigateAddForm = () => {
    const routeProps: RecordNavigationType = {
      isUpdate: false
    }
    navigation.navigate('trainingRecordModal', routeProps)
  }
  
  // 記録の削除
  const handleDeleteRecordItem = (record: RecordItemType) => 
    Alert.alert(
      "このトレーニングを削除します。",
      "本当によろしいですか？",
      [
        {
          text: "Cansel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {dispatch(deleteRecord(record))}
        }
      ],
      { cancelable: false }
    )
  
  // 記録の編集フォームへ移動
  const handleUpdateRecordItme = (record: RecordItemType) => {
    const routeProps: RecordNavigationType = {
      recordItem: record,
      isUpdate: true
    }
    navigation.navigate('trainingRecordModal', routeProps)
  }

  const renderRecordItems = () => {
    const recordsComponent = recordItems.map(item => {
      const renderText = parseRecord(item)
      return (
        <RecordItemWrapper key={item.id}>
          <RecordItemBtn onPress={ () => handleUpdateRecordItme(item) }>
            <RecordItemText>{ renderText.length >= 17 ? truncateText(renderText, 17) + '...' : renderText}</RecordItemText>
            <Icon name="edit" size={16} style={{ color: COLORS.BASE_BLACK }} />
          </RecordItemBtn>
          <RecordDeleteBtn onPress={ () => handleDeleteRecordItem(item)}>
            <RecordItemDelete>削除</RecordItemDelete>
          </RecordDeleteBtn>
        </RecordItemWrapper>
      )
    })
    return recordsComponent
  }

  return (
    <RecordModalContainer >
      <RecordModalTitle>トレーニングお疲れ様でした♪</RecordModalTitle>
      <DateWrapper>
        <TitleLabel>トレーニング日</TitleLabel>
        <DatePicker 
          date={trainingDate}
        />
      </DateWrapper>
      { recordItems.length ? 
      <RecordListContainer>
        <TitleLabel>追加したトレーニング</TitleLabel>
        {renderRecordItems()}
        <RecordNewAddItemBtn onPress={handleNavigateAddForm}>
          <Icon name="plus" size={25} style={{ color: COLORS.BASE_MUSCLEW }} />
          <RecordNewAddItemBtnText>トレーニングの記録を追加する</RecordNewAddItemBtnText>
        </RecordNewAddItemBtn> 
      </RecordListContainer>
      :
      <RecordListContainer>
        <TitleLabel>追加したトレーニング</TitleLabel>
        <RecordModalAddItemBtnForm onPress={handleNavigateAddForm}>
          <Icon name="pluscircleo" size={16} style={{ color: COLORS.SUB_BLACK }} />
          <RecordItemText>トレーニングを追加する</RecordItemText>
        </RecordModalAddItemBtnForm>
      </RecordListContainer>
      }
    </RecordModalContainer>
  )
}

export default RecordModalScreen;

const RecordModalContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 30px 10px;
`

const HeaderNextBtn = styled.TouchableOpacity`
`

const HeaderNextTitle = styled.Text`
  margin-right: 15px;
  font-size: 18px;
  color: ${COLORS.BASE_WHITE};
`

const RecordModalTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0 40px 0;
`

const RecordModalAddItemBtnForm = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 100%;
  margin: 10px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordListContainer = styled.View`
  align-self: center;
  width: 90%;
`

const RecordItemWrapper = styled.View`
  margin-bottom: 15px;
`

const RecordItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 100%;
  margin: 0px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordItemText = styled.Text`
  margin-left: 10px;
  margin-right: 5px;
  color: ${COLORS.SUB_BLACK};
  font-size: 16px;
`

const RecordItemDelete = styled.Text`
  width: 90%;
  align-self: center;
  margin: 10px 5px 0px 0;
  text-align: right;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`

const RecordNewAddItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 10px auto;
`

const RecordNewAddItemBtnText = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: ${COLORS.BASE_MUSCLEW};
`

const RecordDeleteBtn = styled.TouchableOpacity`
  width: 50px;
  margin-left: auto;
  margin-right: 5px;
`

const DateWrapper = styled.View`
  align-self: center;
  width: 85%;
  margin: 0 25px 30px 0;
`

const TitleLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding: 0 20px 20px 0;
  font-size: 14px;
  font-weight: bold;
`
