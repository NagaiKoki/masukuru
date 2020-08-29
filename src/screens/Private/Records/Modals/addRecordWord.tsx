import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
// import components
import Loading from '../../../../components/Loading'
// import types
import { AddRecordWordProps } from '../../../../containers/Private/records/addRecordWord'
// import lib
import { requestAppReview } from '../../../../utilities/requestReview'
import { ImageUpload } from '../../../../utilities/cameraRoll';

const AddRecordWordScreen = (props: AddRecordWordProps) => {
  const { navigation, records, actions } = props
  const { word, recordItems, isLoading } = records
  const { onChangeWord, requestSubmitRecords, initializeRecords } = actions
  const [progress, setProgress] = useState<string>('');
  const [temporaryUrl, setTemporaryUrl] = useState('');
  const record = 1;
  
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
              <HeaderSaveTitle>{ !isLoading ? '送信する' : '送信中...' }</HeaderSaveTitle>
            </HeaderSaveBtn>
          )
        }
      })
    }, [word, isLoading])
  )

  const handleSubmitRecord = async () => {
    if (isLoading) return
    requestSubmitRecords(recordItems, word, temporaryUrl)
    console.log(word)
    console.log(temporaryUrl)
    setTimeout(() => {
      navigation.navigate('mainContainer')
      initializeRecords()
    }, 2000)
    await requestAppReview()
  }

  const handleUpload = () => {
    ImageUpload(setProgress, setTemporaryUrl, undefined, undefined, record)
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
        <UploadImageView>
          { temporaryUrl ? <Image source={{ uri: temporaryUrl }} style={{ width: 100, height: 100, resizeMode: 'cover' }} /> : null }
          { progress ? <RecordImageProgress>{progress}</RecordImageProgress> : null }
        </UploadImageView>
        <WordFormBottom>
          <RecordImageUpload onPress = {handleUpload}>
            <Icon name="image" size={15} style={{ marginRight: 5, color: '#484848' }}/>
            <RecordImageUploadText>
              画像を追加する
            </RecordImageUploadText>
          </RecordImageUpload>
          <WordLengthText>{word.length} / 300</WordLengthText>
        </WordFormBottom>
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
  background-color: ${COLORS.FORM_BACKGROUND};
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

const UploadImageView = styled.View`
  margin-left: 15px;
`

const RecordImageProgress = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`

const WordFormBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
`

const RecordImageUpload = styled.TouchableOpacity`
  margin: 15px 0 0 10px;
  flex-direction: row;
`

const RecordImageUploadText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const WordLengthText = styled.Text`
  text-align: right;
  margin: 10px 10px 0 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

export default AddRecordWordScreen