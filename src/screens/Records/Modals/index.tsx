import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native'
// import types
import { RecordProps } from '../../../containers/record'
import { RecordItemType } from '../../../types/Record'
// import lib
import truncateText from '../../../lib/truncateText'

import firebase, { db } from '../../../config/firebase'

const RecordModalScreen = (props: RecordProps) => {
  const { 
    actions, 
    records,
    navigation 
  } = props
  const { recordItems } = records
  const { deleteRecord, onChangeTrainingName } = actions


  React.useEffect(() => {
    db.collection('users').doc('tTUrLNabUSgM3KGPteWxk7lV1VM2').collection('notifications').get().then(snap => {
      snap.forEach(item => {
        item.data().notification.get().then(snap => {
          console.log(snap.data().contents)
        })
      })
    })
  }, [])

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

  // 一言画面へ遷移
  const handleNavigationWord = () => {
    if (!recordItems.length) {
      Alert.alert('記録を追加してください。')
    } else {
      navigation.navigate('addRecordWordModal')
    }
  }
  
  // 記録フォームへ遷移
  const handleNavigateAddForm = () => {
    onChangeTrainingName('')
    navigation.navigate('addRecordModal', { temporary: true })
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
          onPress: () => { deleteRecord(record) }
        }
      ],
      { cancelable: false }
    )
  
  // 記録の編集フォームへ移動
  const handleUpdateRecordItme = (record: RecordItemType) => {
    onChangeTrainingName(record.name)
    navigation.navigate('addRecordModal', { recordItem: record, isUpdate: true, isMuscle: record.isMuscle } )
  }

  const renderRecordItems = () => {
    const recordsComponent = recordItems.map((item: RecordItemType) => {
      let renderAmountText: string
      let renderWeightText: string
      let renderText: string
      if (item.isMuscle) {
        renderAmountText = item.amounts.join('回, ') + '回, '
        renderWeightText = item.weights.join('kg, ') + 'kg '
        renderText = item.name + ', ' + renderAmountText + renderWeightText
      } else if (item.isMuscle === false) {
        const renderDistance = item.distance ? item.distance + 'km, ' : ''
        const renderTime = item.time ? item.time + '分 ' : ''
        renderText = item.name + ', ' + renderDistance + renderTime
      }

      return (
        <React.Fragment key={item.id}>
          <RecordItemBtn onPress={ () => handleUpdateRecordItme(item) }>
            <RecordItemText>{ renderText.length >= 30 ? truncateText(renderText, 30) + '...' : renderText}</RecordItemText>
            <Icon name="edit" size={16} style={{ color: COLORS.BASE_BLACK }} />
          </RecordItemBtn>
          <RecordDeleteBtn onPress={ () => handleDeleteRecordItem(item)}>
            <RecordItemDelete>削除</RecordItemDelete>
          </RecordDeleteBtn>
        </React.Fragment>
      )
    })
    return recordsComponent
  }
  
  return (
    <RecordModalContainer >
      <RecordModalTitle>お疲れ様でした♪</RecordModalTitle>
      <RecordItemTitle>本日のトレーニング</RecordItemTitle>
      { recordItems.length ? 
      <React.Fragment>
        {renderRecordItems()}
        <RecordNewAddItemBtn onPress={handleNavigateAddForm}>
          <Icon name="plus" size={25} style={{ color: COLORS.BASE_BLACK }} />
          <RecordNewAddItemBtnText>トレーニングの記録を追加する</RecordNewAddItemBtnText>
        </RecordNewAddItemBtn> 
      </React.Fragment>
      :
      <React.Fragment>
        <RecordModalAddItemBtnForm onPress={handleNavigateAddForm}>
          <Icon name="pluscircleo" size={16} style={{ color: COLORS.SUB_BLACK }} />
          <RecordItemText>トレーニングを追加する</RecordItemText>
        </RecordModalAddItemBtnForm>
      </React.Fragment>
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
  font-size: 16px;
  color: ${COLORS.BASE_WHITE};
`

const RecordModalTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0 20px 0;
`

const RecordItemTitle = styled.Text`
  width: 90%;
  align-self: center;
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0 20px 0;
`

const RecordModalAddItemBtnForm = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  margin: 20px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  margin: 0px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordItemText = styled.Text`
  margin-left: 10px;
  color: ${COLORS.SUB_BLACK};
  font-size: 16px;
`

const RecordItemDelete = styled.Text`
  width: 90%;
  align-self: center;
  margin: 10px 5px 15px 0;
  text-align: right;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`

const RecordNewAddItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: 10px auto;
`

const RecordNewAddItemBtnText = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: ${COLORS.BASE_BLACK};
`

const RecordDeleteBtn = styled.TouchableOpacity`
  width: 30px;
  margin-left: auto;
  margin-right: 25px;
`
