import React from 'react'
import styled from 'styled-components'
// import components
import Button from '../../../common/Button'
import StepTitle from '../../../components/Tutorial/StepTitle'
// import constants
import { COLORS } from '../../../constants/Styles'
// import selectors
import { useGroupSelector } from '../../../selectors/group'

const TutorialSelectGroup = () => {
  const { requestCreateGroup } = useGroupSelector()

  const handleCreateGroup = () => {
    requestCreateGroup()
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
            text="１人で使う"
            handleOnClick={handleCreateGroup}
          />
        </ButtonWrapper>
      </Wrapper>
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

`