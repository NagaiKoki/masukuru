import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import * as StoreReview from 'expo-store-review';
import { COLORS } from '../../../../constants/Styles'
// import apis
import { requestFetchUser } from '../../../../apis/Users'
// import components
import Loading from '../../../../components/Loading'
// import types
import { AddRecordWordProps } from '../../../../containers/Private/records/addRecordWord'
// import confing
import firebase from '../../../../config/firebase'

const AddRecordWordScreen = (props: AddRecordWordProps) => {
  const { navigation, records, actions } = props
  const { word, recordItems, isLoading } = records
  const { onChangeWord, requestSubmitRecords, initializeRecords } = actions
  
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: '記録のひとこと',
        headerStyle: {
          backgroundColor: COLORS.BASE_MUSCLEW
        },
        headerTintColor: COLORS.BASE_WHITE,
        headerBackTitleVisible: false,
        headerRight: () => {
          return (
            <HeaderSaveBtn onPress={ () => handleSubmitRecord()} disabled={isLoading} >
              <HeaderSaveTitle>送信する</HeaderSaveTitle>
            </HeaderSaveBtn>
          )
        }
      })
    }, [word, isLoading])
  )

  const handleSubmitRecord = async () => {
    if (isLoading) return
    requestSubmitRecords(recordItems, word)
    const { user, error }: { user?: any, error?: string }  = await requestFetchUser(firebase.auth().currentUser.uid)
    if (StoreReview.isAvailableAsync() && !user.isReviewed) {
      await StoreReview.requestReview();
      await user.update({ isReviewed: true })
    }
    setTimeout(() => {
      navigation.navigate('mainContainer')
      initializeRecords()
    }, 2000)
  }

  if (isLoading) {
    return (
      <Loading size="small" />
    )
  }

  return (
    <AddWordContainer>
      <AddWordFormWrapper>
        <AddWordForm
          placeholder="今日のトレーニングはどうでしたか？"
          autoCapitalize={'none'}
          multiline = {true}
          numberOfLines = {4}
          maxLength={300}
          defaultValue={word}
          autoCorrect={ false }
          onChangeText={ (text: string) => onChangeWord(text) }
        />
        <WordLengthText>{word.length} / 300</WordLengthText>
      </AddWordFormWrapper>
    </AddWordContainer>
  )
}

const AddWordContainer = styled.View`
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

const AddWordFormWrapper = styled.View`
`

const AddWordForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 100%;
  min-height: 250px;
  color: ${COLORS.BASE_BLACK};
  padding: 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const WordLengthText = styled.Text`
  text-align: right;
  margin: 10px 10px 0 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

export default AddRecordWordScreen