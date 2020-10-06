import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import Button from '../../../common/Button'
import StepTitle from '../../../components/Tutorial/StepTitle'
import JoinGroupModal from '../../../components/Tutorial/JoinGroupModal'
// import constants
import { COLORS } from '../../../constants/Styles'
// import selectors
import { useGroupSelector } from '../../../selectors/group'

const TutorialSelectGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { requestCreateGroup } = useGroupSelector()

  const handleCreateGroup = () => {
    requestCreateGroup()
  }

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <Container>
      <Wrapper>
        <StepTitle 
          title="グループを作成しよう！"
          stepCount={4}
        />
        <ButtonWrapper>
          <Button 
            text="自分がホストのグループを作成する"
            bold={true}
            padding='15px 0'
            fontSize={16}
            handleOnClick={handleCreateGroup}
          />
          <SubText>※ 作成した後でも招待されたグループに参加できます。</SubText>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button 
            text="招待されたグループに参加する"
            bold={true}
            padding='15px 0'
            fontSize={16}
            handleOnClick={handleToggleModal}
          />
        </ButtonWrapper>
      </Wrapper>
      <JoinGroupModal 
        isOpen={isModalOpen}
        handleCloseModal={handleToggleModal}
      />
    </Container>
  )
}

export default TutorialSelectGroup

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 30px 15px;
`

const ButtonWrapper = styled.View`
  margin-top: 50px;
`

const SubText = styled.Text`
  padding-top: 5px;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`