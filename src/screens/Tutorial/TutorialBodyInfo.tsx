import React, { useState } from 'react';
import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS } from '../../constants/Styles';
import { Alert, Text, StyleSheet } from 'react-native';
import firebase, { db } from '../../config/firebase';
import { KeyboardAvoidingView } from 'react-native';

const TutorialBodyInfoScreen = ({ navigation }) => {
  const [age, setAge] = useState<number>(null)
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState<number>(null)
  const [heigjt, setHeight] = useState<number>(null)
  const currentUser = firebase.auth().currentUser

  const onSubmit = () => {
    const updatedata = { age: age, sex: sex, heigjt: heigjt, weight: weight }
    db.collection('users').doc(currentUser.uid).update(updatedata).then(() => {
      navigation.navigate('TutorialUserImage')
    }).catch((error) => {
      console.log(error)
      Alert.alert('原因不明のエラーが発生しました。時間をおいてから再度お試しください。')
    })
  }

  const sexSelectForm = () => {
    const items = [{ label: '男性', value: '男性' }, { label: '女性', value: '女性' }, { label: 'その他', value: 'その他' } ]
    return (
      <SelectWrapper>
        <SelectLabel>性別を選択する（必須）</SelectLabel>
        <RNPickerSelect
          items={items}
          placeholder={{ label: '選択してください', value: '' }} 
          onValueChange={ sex => setSex(sex) }
          style={pickerSelectStyles}
          Icon={() => (<Text style={{ position: 'absolute', right: 55, top: 10, fontSize: 18, color: COLORS.SUB_BLACK }}>▼</Text>)}
        />
      </SelectWrapper>
    )
  }

  const ageTextForm = () => {
    return (
      <SelectWrapper>
        <SelectLabel>年齢を入力する（任意）</SelectLabel>
        <TextFromWrapper>
          <TextForm 
            onChangeText={text => setAge(text)}
            placeholder='20'
            maxLength={3}
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={ false }
          />
          <TextFormSubText>歳</TextFormSubText>
        </TextFromWrapper>
      </SelectWrapper>
    )
  }

  const heightTextForm = () => {
    return (
      <SelectWrapper>
        <SelectLabel>身長を入力する（任意）</SelectLabel>
        <TextFromWrapper>
          <TextForm 
            onChangeText={text => setHeight(text)}
            placeholder='20'
            maxLength={3}
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={ false }
          />
          <TextFormSubText>cm</TextFormSubText>
        </TextFromWrapper>
      </SelectWrapper>
    )
  }

  const weightTextForm = () => {
    return (
      <SelectWrapper>
        <SelectLabel>体重を入力する（任意）</SelectLabel>
        <TextFromWrapper>
          <TextForm 
            onChangeText={text => setWeight(text)}
            placeholder='60'
            maxLength={3}
            keyboardType={'numeric'}
            autoCapitalize={'none'}
            autoCorrect={ false }
          />
          <TextFormSubText>kg</TextFormSubText>
        </TextFromWrapper>
      </SelectWrapper>
    )
  }
 
  const disableSubmit = (
    !!sex ? false : true
  )

  const renderSubmitBtn = ( 
    <SubmitBtn onPress={() => onSubmit()} disabled={disableSubmit} disableSubmit={disableSubmit}>
      <SubmitText>次へ</SubmitText>
    </SubmitBtn>
  )
 
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor: COLORS.BASE_BACKGROUND }} keyboardVerticalOffset={200}>
    <TutorialContainer>
      <TutorialStepTitle>
        - step 2 -
      </TutorialStepTitle>
      <TutorialTitle>
        基本情報を登録しよう！
      </TutorialTitle>
      <TutorialWrapper>
        {sexSelectForm()}
        {ageTextForm()}
        {heightTextForm()}
        {weightTextForm()}
        {renderSubmitBtn}
      </TutorialWrapper>
    </TutorialContainer>
    </KeyboardAvoidingView>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.BASE_BORDER_COLOR,
    borderRadius: 4,
    color: COLORS.BASE_BLACK,
    paddingRight: 30,
    backgroundColor: COLORS.BASE_WHITE,
    width: '80%',
    alignSelf: 'center'
  },
})

const TutorialContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const TutorialStepTitle = styled.Text`
  padding: 50px 0 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${COLORS.SUB_BLACK};
`

const TutorialTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: ${COLORS.BASE_BLACK};
`

const TutorialWrapper = styled.View`
  width: 90%;
  margin: 20px auto;
`

const SelectWrapper = styled.View`
`

const SelectLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  font-weight: bold;
  width: 80%;
  margin: 0 auto;
  padding: 30px 0 10px 0;
`

const TextForm = styled.TextInput`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  width: 20%;
  padding: 15px;
  align-self: center;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE};
`

const TextFromWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`

const TextFormSubText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  margin-left: 10px;
`

const SubmitBtn = styled.TouchableOpacity<{ disableSubmit: boolean }>`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 60px;
  margin-top: 50px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const SubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default TutorialBodyInfoScreen;