import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
// import components
import Loading from '../../../../components/Loading'
// import lib
import { requestAppReview } from '../../../../utilities/requestReview'
import { ImageUpload } from '../../../../utilities/cameraRoll';
// import slices
import { requestUpdateRecord, requestSubmitRecords, initializeRecords } from '../../../../slice/record'
// import selectors
import recordSelector from '../../../../selectors/record' 

const AddRecordWordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { recordItems, isLoading, word, imageUrl } = recordSelector()
  const { isEdit, recordId } = route.params
  const [text, setText] = useState('')
  const [progress, setProgress] = useState<string>('');
  const [temporaryUrl, setTemporaryUrl] = useState('');
  const record = 'record';

  const SUBMIT_BTN_TEXT = isEdit ? '更新する' : '送信する'
  
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
              <HeaderSaveTitle>{ !isLoading ? SUBMIT_BTN_TEXT : '送信中...' }</HeaderSaveTitle>
            </HeaderSaveBtn>
          )
        }
      })
    }, [text, temporaryUrl, isLoading])
  )

  useEffect(() => {
    if (isEdit) {
      setText(word)
      setTemporaryUrl(imageUrl)
    }
  }, [])

  const handleRequestSubmit = () => {
    if (isEdit) {
      dispatch(requestUpdateRecord({ id: recordId, records: recordItems, word: text, imageUrl: temporaryUrl }))
    } else {
      dispatch(requestSubmitRecords({ records: recordItems, word: text, imageUrl: temporaryUrl }))
    }
  }

  const handleSubmitRecord = async () => {
    if (isLoading) return
    handleRequestSubmit()
    setTimeout(() => {
      navigation.navigate('mainContainer')
      dispatch(initializeRecords())
    }, 2000)
    await requestAppReview()
  }

  const handleUpload = () => {
    ImageUpload(setProgress, setTemporaryUrl, undefined, undefined, record)
  }

  const handleOnDeleteImage = () => {
    setTemporaryUrl('')
  }

  const renderImage =
    <UploadImageView>
      { temporaryUrl ? <Image source={{ uri: temporaryUrl }} style={{ width: 200, height: 150, resizeMode: 'cover', borderRadius: 4 }} /> : null }
      { temporaryUrl ? 
        <ImageCloseBtn onPress={handleOnDeleteImage}>
          <Icon name="times-circle" size={20} style={{ color: COLORS.BASE_WHITE }} />
        </ImageCloseBtn> :
        null
      }
      { progress ? <RecordImageProgress>{progress}</RecordImageProgress> : null }
    </UploadImageView>


  const renderImageForm =
    <RecordImageUpload onPress={handleUpload}>
      <Icon name="image" size={15} style={{ marginRight: 7, marginLeft: 7, color: '#484848' }}/>
      <RecordImageUploadText>
        { !!temporaryUrl ? '画像を変更する' : '画像を追加する' }
      </RecordImageUploadText>
  </RecordImageUpload>
    
  return (
    <AddWordContainer>
      { isLoading ? 
        <Loading size="small" /> :  
        <AddWordFormWrapper>
          <AddWordForm
            placeholder="今日のトレーニングはどうでしたか？"
            autoCapitalize={'none'}
            multiline = {true}
            numberOfLines = {4}
            maxLength={300}
            defaultValue={text}
            autoCorrect={ false }
            onChangeText={ (text: string) => setText(text) }
          />
          {renderImage}
          <WordFormBottom>
            {renderImageForm}
            <WordLengthText>{text.length} / 300</WordLengthText>
          </WordFormBottom>
      </AddWordFormWrapper>
      }
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
  width: 200px;
  margin-left: 15px;
  position: relative;
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

const ImageCloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 3px;
  right: 3px;
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