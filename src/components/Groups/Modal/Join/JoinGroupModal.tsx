import React, { useState } from 'react'
import styled from 'styled-components'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import Form from '../../../../common/Form'
import Button from '../../../../common/Button'
// import constants
import { COLORS } from '../../../../constants/Styles'

type PropsType = {
  isOpen: boolean
  authorized?: boolean
  navigation?: any
  handleCloseModal: () => void
}

const JoinGroupModal = (props: PropsType) => {
  const { isOpen, authorized, navigation, handleCloseModal } = props
  const [code, setCode] = useState('')
  const { error, requestJoinGroup } = useGroupSelector()

  const handleChangeCode = (value: string) => {
    setCode(value)
  }

  const handleOnSubmit = () => {
    if (authorized) {
      handleCloseModal()
      navigation.navigate('mainContainer')
    }
    requestJoinGroup(code)
  }

  return (
    <BottomModal isOpen={isOpen} height={350} onClose={handleCloseModal}>
      <Container>
        <Title>6桁の招待コードを入力しよう！</Title>
        <FormWrapper>
          <Form 
            placeholder="6桁の英数字"
            maxLength={6}
            onChange={handleChangeCode}
          />
          { error && !authorized ? <ErrorText>{error}</ErrorText> : null }
          <SubText>※ 招待先のグループが11人以上の場合、参加できません。</SubText>
        </FormWrapper>
        <ButtonWrapper>
          <Button 
            text="参加する"
            bold={true}
            padding='15px 0'
            fontSize={16}
            handleOnClick={handleOnSubmit}
          />
        </ButtonWrapper>
      </Container>
    </BottomModal>
  )
}

export default JoinGroupModal

const Container = styled.View`
  height: 200px;
  padding: 20px 40px;
  background: ${COLORS.BASE_WHITE};
`

const Title = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`

const FormWrapper = styled.View`
  padding: 20px 0 30px 0;
`

const ButtonWrapper = styled.View`
`

const ErrorText = styled.Text`
  color: ${COLORS.ERROR_MESSAGE};
  font-size: 14px;
  padding: 10px 0;
`

const SubText = styled.Text`
  padding: 5px 0 0 5px;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`