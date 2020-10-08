import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import Button from '../../../common/Button'
import Form from '../../../common/Form'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { GroupType } from '../../../types/Group'
// import selectors
import { useGroupSelector } from '../../../selectors/group'

type PropsType = {
  group: GroupType
  navigation: any
}

const GroupEdit = (props: PropsType) => {
  const { group, navigation } = props
  const { requestPatchGroupInfo } = useGroupSelector()
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState('')
  const [name, setName] = useState('')
  const { imageUrl, groupName } = group

  const handleChangeName = (value: string) => {
    setName(value)
  }

  const handleOnSubmit = () => {
    requestPatchGroupInfo({ imageUrl: url, groupName: name })
    navigation.goBack()
  }

  return (
    <Container>
      <FromWrapper>
        <Form placeholder="目指せスリム体型！" defaulutValue={groupName} onChange={handleChangeName} />
      </FromWrapper>
      <ButtonWrapper>
        <Button text='保存する' bold={true} padding="15px 0" fontSize={16} handleOnClick={handleOnSubmit} />
      </ButtonWrapper>
    </Container>
  )
}

export default GroupEdit

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const FromWrapper = styled.View``

const ButtonWrapper = styled.View``