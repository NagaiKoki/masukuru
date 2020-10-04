import React from 'react'
import styled from 'styled-components'
// import components
import Form from '../../common/Form'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
}

const EmailAuthForm = (props: PropsType) => {
  const { email, password, onEmailChange, onPasswordChange } = props

  return (
    <Container>
      <FormWrapper>
        <FormLabel>メールアドレス</FormLabel>
        <Form
          placeholder="メールアドレスを入力する"
          value={email}
          onChange={onEmailChange}
        />
      </FormWrapper>
      <FormWrapper>
        <FormLabel>パスワード</FormLabel>
        <Form 
          placeholder="パスワードを入力する"
          value={password}
          secureTextEntry={true}
          onChange={onPasswordChange}
        />
      </FormWrapper>
    </Container>
  )
}

export default EmailAuthForm

const Container = styled.View``

const FormWrapper = styled.View``

const FormLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  width: 100%;
  margin: 5px auto;
  margin-top: 10px;
  font-weight: bold;
`