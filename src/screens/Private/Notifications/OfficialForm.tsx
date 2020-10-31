import React, { useState } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import apis
import { requestOfficialNotification } from '../../../apis/Notifications'
// import components
import Form from '../../../common/Form'
import Button from '../../../common/Button'

const OfficialNotificationForm = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleOnChangeTitle = (value: string) => {
    setTitle(value)
  }

  const handleOnChangeContent = (value: string) => {
    setContent(value)
  }

  const handleOnSubmit = async () => {
    await requestOfficialNotification(title, content)
    navigation.goBack()
  }

  return (
    <Container>
      <Wrapper>
        <Label>タイトル</Label>
        <Form
          value={title}
          onChange={handleOnChangeTitle}
        />
      </Wrapper>
      <Wrapper>
        <Label>内容</Label>
        <TextArea
          autoCapitalize={'none'}
          multiline = {true}
          numberOfLines = {4}
          maxLength={300}
          defaultValue={content}
          autoCorrect={false}
          onChangeText={handleOnChangeContent}
        />
      </Wrapper>
      <Button text="送信" handleOnClick={handleOnSubmit} />
    </Container>
  )
}

export default OfficialNotificationForm

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 20px;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 0px 0 20px 0;
`

const Label = styled.Text`
  padding-bottom: 10px;
`

const TextArea = styled.TextInput`
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