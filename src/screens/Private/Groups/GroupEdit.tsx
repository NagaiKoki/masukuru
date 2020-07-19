import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
// import apis
import { requestEditGroup } from '../../../apis/Groups/edit'
// import componnets
import { GroupImage, UnSettingGroupImage } from '../../../components/Image/groupImage'
// import lib
import { ImageUpload } from '../../../utilities/cameraRoll';

const GroupEditScreen = ({ navigation, route }) => {
  const groupInfo = route.params.groupInfo
  const groupUserImages = route.params.groupUserImages
  const { groupName, imageUrl } = groupInfo
  const [name, setName] = useState(groupName)
  const [progress, setProgress] = useState<string>('');
  const [temporaryUrl, setTemporaryUrl] = useState('')

  const currentGroupId = route.params.currentGroupId
  
  const handleSubmit = async () => {
    await requestEditGroup(currentGroupId, name, temporaryUrl)
    navigation.goBack('groupInfo', { currentGroupId: currentGroupId })
  }

  const handleUpload = () => {
    ImageUpload(setProgress, setTemporaryUrl, currentGroupId)
  }

  const renderUploadImage = <GroupImage  url={temporaryUrl} height={90} width={90} />

  const renderGroupImage = 
    imageUrl ? <GroupImage url={imageUrl} height={90} width={90} />
    : <UnSettingGroupImage urls={groupUserImages} width={90} height={90} />
 
  return (
    <GroupEditContainer>
      <GroupEditWrapper>
        <GroupImageWrapper onPress={handleUpload}>
          {temporaryUrl ? renderUploadImage : renderGroupImage}
        </GroupImageWrapper>
        { progress ? <GroupImageProgress>{progress}</GroupImageProgress> : null}
        <GroupImageBtn onPress={handleUpload}>
          <GroupImageText>グループ画像を変更する</GroupImageText>
        </GroupImageBtn>
        <GroupEditTitle>グループ名</GroupEditTitle>
          <GroupEditForm
            placeholder='例）目指せスリム体型！（15文字まで）'
            autoCapitalize={'none'}
            maxLength={15}
            value={name}
            onChangeText={ text => setName(text) }
          />

        <GroupEditSubmitBtn onPress={() => handleSubmit()}>
          <GroupEditSubmitText>更新する</GroupEditSubmitText>
        </GroupEditSubmitBtn>
        <GroupEditResetText onPress={() => navigation.goBack('groupInfo', { currentGroupId: currentGroupId })}>キャンセル</GroupEditResetText>
      </GroupEditWrapper>
    </GroupEditContainer>
  )
}

const GroupEditContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const GroupEditWrapper = styled.View`
  margin: 0 auto;
  width: 90%;
  padding: 30px 0;
`

const GroupImageWrapper = styled.TouchableOpacity`
  align-self: center;
  width: 90px;
  height: 90px;
  border-radius: 60px;
`

const GroupImageText = styled.Text`
  margin-top: 15px;
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`

const GroupImageBtn = styled.TouchableOpacity`
  margin-bottom: 20px;
`

const GroupImageProgress = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`

const GroupEditTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
`

const GroupEditForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 100%;
  align-self: center;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 10px 0;
  color: ${COLORS.BASE_BLACK};
`

const GroupEditSubmitBtn = styled.TouchableOpacity`
  width: 100%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 30px;
`

const GroupEditSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const GroupEditResetText = styled.Text`
  margin-top: 30px;
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  &:hover {
    opacity: 0.5;
  }
`

export default GroupEditScreen;

