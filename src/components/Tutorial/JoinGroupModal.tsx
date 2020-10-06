import React, { useState } from 'react'
import styled from 'styled-components'
// import selectors
import { useGroupSelector } from '../../selectors/group'
// import components
import BottomModal from '../../common/Modal/BottomModal'
import Form from '../../common/Form'
import Button from '../../common/Button'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  isOpen: boolean
  handleCloseModal: () => void
}

const JoinGroupModal = (props: PropsType) => {
  const { isOpen, handleCloseModal } = props
  const [code, setCode] = useState('')
  const { error, requestJoinGroup } = useGroupSelector()

  const handleChangeCode = (value: string) => {
    setCode(value)
  }

  const handleOnSubmit = () => {
    requestJoinGroup(code)
  }

  return (
    <BottomModal isOpen={isOpen} onClose={handleCloseModal}>
      <Container>
        <Title>6桁の招待コードを入力しよう！</Title>
        <FormWrapper>
          <Form 
            placeholder="6桁の英数字"
            maxLength={6}
            onChange={handleChangeCode}
          />
          <SubText>{}</SubText>
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

const SubText = styled.Text`
  padding: 5px 0 0 5px;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`