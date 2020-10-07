import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import apis
import { requestGroupUsers } from '../../../../apis/Groups/v1'
// import components
import { GroupImage, UnSettingGroupImage } from '../../../Image/groupImage'
// import types
import { GroupType } from '../../../../types/Group'
// import constants
import { COLORS } from '../../../../constants/Styles'

type PropsType = {
  group: GroupType
}

const GroupSwtichModalItem = (props: PropsType) => {
  const { group } = props
  const { id, imageUrl, groupName } = group
  const [urls, setUrls] = useState([])
  const [names, setNames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const requestFetchGetGroupUsers = async () => {
    let nameArray: string[] = []
    let urlArray: string[] = []
    const { payload, error } = await requestGroupUsers(id)
    if (payload && !error) {
      payload.forEach(user => {
        nameArray.push(user.name)
        urlArray.push(user.imageUrl)
      })
      setNames(nameArray)
      setUrls(urlArray)
    }
  }

  useEffect(() => {
    if (!imageUrl || !groupName) {
      requestFetchGetGroupUsers()
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <></>
  }

  const renderImage = imageUrl ?
    <GroupImage url={imageUrl} width={40} height={40} /> :
    <UnSettingGroupImage urls={urls} width={40} height={40} />

  const renderGroupName =
    <GroupName>
      { groupName || names.join(', ') }
    </GroupName>

  return (
    <Wrapper activeOpacity={0.8}>
      {renderImage}
      {renderGroupName}   
    </Wrapper>
  )
}

export default GroupSwtichModalItem

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  padding: 7px 15px;
`

const GroupName = styled.Text`
  padding-left: 15px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 16px;
`