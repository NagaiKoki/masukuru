import React, { useEffect } from 'react'
import styled from 'styled-components'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import List from './List'
import Loading from '../../../Loading'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
import { COLORS } from '../../../../constants/Styles'

type PropsType = {
  isOpen: boolean
  handleOnClose: () => void
}

const GroupSwitchModal = (props: PropsType) => {
  const { isOpen, handleOnClose } = props
  const { belongGroups, requestFetchBelongGroups } = useGroupSelector()

  useEffect(() => {
    requestFetchBelongGroups()
  }, [])

  if (!belongGroups.length) {
    return <></>
  }

  return (
    <BottomModal isOpen={isOpen} onClose={handleOnClose}>
      <Container>
        <Title>所属グループ</Title>
        <List groups={belongGroups} />
      </Container>
    </BottomModal>
  )
}

export default GroupSwitchModal

const Container = styled.View``

const Title = styled.Text`
  padding: 20px 0;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`