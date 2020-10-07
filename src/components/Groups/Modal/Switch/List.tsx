import React from 'react'
import styled from 'styled-components'
// import types
import { GroupType } from '../../../../types/Group'
// import components
import Item from './Item'
// import constants
import { COLORS } from '../../../../constants/Styles'

type PropsType = {
  groups: GroupType[]
}

const GroupSwtichModalList = (props: PropsType) => {
  const { groups } = props

  const renderList = groups.map((item, i) => (
    <Item key={i} group={item} />
  ))

  return (
    <Wrapper>
      {renderList}
    </Wrapper>
  )
}

export default GroupSwtichModalList

const Wrapper = styled.ScrollView`
  max-height: 400px;
  border-top-width: 1px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
`