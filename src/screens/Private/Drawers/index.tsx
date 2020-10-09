import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import User from '../../../components/Drawer/User'
import DrawerList from '../../../components/Drawer/List'
// selectors
import { useUserSelectors } from '../../../selectors/user'

const Drawer = ({ navigation }) => {
  const { currentUser } = useUserSelectors()

  if (!currentUser) {
    return <></>
  }

  const handleNaivgateUser = () => {
    navigation.navigate('MyPage')
  }

  return (
    <Container>
      <User currentUser={currentUser} onClick={handleNaivgateUser} />
      <DrawerList navigation={navigation} />
    </Container>
  )
}

export default Drawer

const Container = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  height: 100%;
  width: 100%;
  padding-top: 90px;
  padding-left: 30px;
`