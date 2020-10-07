import React, { useEffect } from 'react'
import styled from 'styled-components'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import Loading from '../../../Loading'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'

type PropsType = {
  isOpen: boolean
  handleOnClose: () => void
}

const GroupSwitchModal = (props: PropsType) => {
  const { isOpen, handleOnClose } = props
  const { belongGroups, isLoading, requestFetchBelongGroups } = useGroupSelector()

  useEffect(() => {
    requestFetchBelongGroups()
  }, [])

  if (isLoading) {
    return <Loading size="small" />
  }

  return (
    <BottomModal isOpen={isOpen} onClose={handleOnClose}>
      <Container>

      </Container>
    </BottomModal>
  )
}

export default GroupSwitchModal

const Container = styled.View``