import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import User from '../../../components/Drawer/User'
// selectors
import { useUserSelectors } from '../../../selectors/user'

const Drawer = ({ navigation }) => {
  const { currentUser } = useUserSelectors()

  if (!currentUser) {
    return <></>
  }

  return (
    <Container>
      <User currentUser={currentUser} />
    </Container>
  )
}

export default Drawer

const Container = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  height: 100%;
  width: 100%;
  padding-top: 70px;
  padding-left: 30px;
`