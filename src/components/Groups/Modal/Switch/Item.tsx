import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import apis
import { requestGroupUsers } from '../../../../apis/Groups/v1'
// import components
import { GroupImage, UnSettingGroupImage } from '../../../Image/groupImage'
// import types
import { GroupType } from '../../../../types/Group'
// import constants
import { COLORS } from '../../../../constants/Styles'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
// import utils
import { lazyFunction } from '../../../../utilities/Function/lazyFunction'

type PropsType = {
  group: GroupType
  handleOnNavigate: () => void
  handleOnClose: () => void
}

const GroupSwtichModalItem = (props: PropsType) => {
  const { group, handleOnNavigate, handleOnClose } = props
  const { id, imageUrl, groupName } = group
  const { currentGroupId, requestSwitchGroup } = useGroupSelector()
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

  const handleSwitchGroup = () => {
    handleOnClose()
    handleOnNavigate()
    lazyFunction(requestSwitchGroup, 300)(id)
  }

  const renderImage = imageUrl ?
    <GroupImage url={imageUrl} width={35} height={35} /> :
    <UnSettingGroupImage urls={urls} width={35} height={35} />

  const renderGroupName =
    <GroupName>
      { groupName || names.join(', ') }
    </GroupName>
  
  const renderCurrentMark = currentGroupId === id &&
    <Icon name="checkcircle" size={20} style={{ color: COLORS.SUCCESS_MESSAGE }} />

  return (
    <Wrapper activeOpacity={0.8} onPress={handleSwitchGroup}>
      <GroupWrapper>
        {renderImage}
        {renderGroupName}
      </GroupWrapper>
      {renderCurrentMark}
    </Wrapper>
  )
}

export default GroupSwtichModalItem

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  padding: 7px 15px;
`

const GroupWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const GroupName = styled.Text`
  padding-left: 10px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 14px;
`