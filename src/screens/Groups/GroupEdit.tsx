import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
// import apis
import { requestEditGroup } from '../../apis/Groups/edit'

const GroupEditScreen = ({ navigation, route }) => {
  const currentGroupName = route.params.name
  const [name, setName] = useState(currentGroupName)
  const currentGroupId = route.params.currentGroupId
  
  const handleSubmit = async () => {
    await requestEditGroup(currentGroupId, name)
    navigation.goBack('groupInfo', { currentGroupId: currentGroupId })
  }

  return (
    <GroupEditContainer>
      <GroupEditWrapper>
        <GroupEditTitle>グループ名</GroupEditTitle>
        <GroupEditForm
          placeholder='15文字まで'
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

