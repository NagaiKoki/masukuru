import React from 'react'
import styled from 'styled-components'
// import components
import GroupEdit from '../../../components/Groups/Info/Edit'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { GroupType } from '../../../types/Group'

type RoutePropsType = {
  params: {
    currentGroup: GroupType
    groupUsersImages: string[]
  }
}

const GroupEditScreen = ({ navigation, route }: { navigation: any, route: RoutePropsType }) => {
  const { currentGroup, groupUsersImages } = route.params
  
  return (
    <Container>
      <GroupEdit group={currentGroup} groupUsersImages={groupUsersImages} navigation={navigation} />
    </Container>
  )
}

export default GroupEditScreen

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background: ${COLORS.BASE_WHITE};
`