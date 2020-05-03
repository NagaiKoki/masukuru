import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
// import constans
import { COLORS } from '../../constants/Styles'
// import components
import Loading from '../../components/Loading'
import UserImage from '../../components/Image/userImage'
// import apis
import { getGroupInfo, GroupInfoResponse } from '../../apis/Groups/edit'

const GroupInfoScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [groupInfo, setGroupInfo] = useState<GroupInfoResponse>(null)

  const currentGroupId = route.params.currentGroupId
  
  useFocusEffect(
    useCallback(() => {
      const getInfo = async () => {
        const info = await getGroupInfo(currentGroupId)
        setGroupInfo(info)
      }
      getInfo()
      setIsLoading(false)
    }, [])
  )

  if (isLoading || !groupInfo) {
    return <Loading size="small" />
  }

  return (
    <GroupContainer>
      <GroupInfoWrapper>
      <GroupInfoTitle>グループ名</GroupInfoTitle>
        <GroupInfoName>{groupInfo.groupName ? groupInfo.groupName : "未設定"}</GroupInfoName>
        <GroupInfoTitle>グループのホスト</GroupInfoTitle>
        <GroupInfoOwner>
          <UserImage uri={groupInfo.owner.imageUrl} width={30} height={30} borderRadius={60} />
          <GroupInfoOwnerName>{groupInfo.owner.name}</GroupInfoOwnerName>
        </GroupInfoOwner>
        <GroupInfoSubmitBtn onPress={ () => navigation.navigate('groupEdit', { currentGroupId: currentGroupId, name: groupInfo.groupName }) }>
          <GroupInfoSubmitText>編集する</GroupInfoSubmitText>
        </GroupInfoSubmitBtn>
      </GroupInfoWrapper>
    </GroupContainer>
  )
}

const GroupContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const GroupInfoWrapper = styled.View`
  margin: 0 auto;
  width: 85%;
  padding: 30px 0;
`

const GroupInfoTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  margin-top: 40px;
  font-weight: bold;
  margin-bottom: 10px;
`

const GroupInfoOwner = styled.View`
  flex-direction: row;
  align-items: center;
`

const GroupInfoOwnerName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  margin-left: 10px;
`

const GroupInfoName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
`

const GroupInfoSubmitBtn = styled.TouchableOpacity`
  width: 100%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 30px;
`

const GroupInfoSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default GroupInfoScreen;