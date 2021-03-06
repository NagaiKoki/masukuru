import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import selectors
import { useUserSelectors } from '../../../selectors/user'
// import components
import Form from '../../../common/Form'
import Button from '../../../common/Button'
import StepTitle from '../../../components/Tutorial/StepTitle'
// import constants
import { COLORS } from '../../../constants/Styles'
// import config
import firebase from '../../../config/firebase'

const TutorialUserName = ({ navigation }) => {
  const { requestFetchCurrentUserData, requestUpdateUser, currentUser } = useUserSelectors()
  const [userName, setUserName] = useState('')
  
  useEffect(() => {
    requestFetchCurrentUserData(firebase.auth().currentUser.uid)
  }, [])

  const handleNameChange = (value: string) => {
    setUserName(value)
  }

  const disabled = userName.length < 2 || userName.length > 15

  const handleOnSubmit = () => {
    if (disabled) return
    requestUpdateUser({ ...currentUser, name: userName })
    navigation.navigate('TutorialBodyInfo')
  }

  return (
    <Container>
      <Wrapper>
        <StepTitle 
          title="自分の名前を登録しよう！"
          stepCount={1}
        />
        <FormWrapper>
          <Form 
            placeholder="筋肉 太郎（2文字以上15文字以下）"
            maxLength={20}
            value={userName}
            onChange={handleNameChange}
          />
        </FormWrapper>
        <Button 
          text='次へ'
          fontSize={16}
          bold={true}
          disabled={disabled}
          padding='15px 0'
          handleOnClick={handleOnSubmit}
        />
      </Wrapper>
    </Container>
  )
}

export default TutorialUserName

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 30px 20px;
`

const FormWrapper = styled.View`
  padding: 40px 0px 20px 0px;
`