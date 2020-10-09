import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import Button from '../../../common/Button'
import Form from '../../../common/Form'
import { GroupImage, UnSettingGroupImage } from '../../Image/groupImage'
import { Label } from '../../../common/Text'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { GroupType } from '../../../types/Group'
// import selectors
import { useGroupSelector } from '../../../selectors/group'
// import utils
import { ImageUpload } from '../../../utilities/cameraRoll'

type PropsType = {
  group: GroupType
  groupUsersImages: string[]
  navigation: any
}

const GroupEdit = (props: PropsType) => {
  const { group, groupUsersImages, navigation } = props
  const { id, imageUrl, groupName } = group
  const { requestPatchGroupInfo } = useGroupSelector()
  const [url, setUrl] = useState(imageUrl)
  const [progress, setProgress] = useState('')
  const [name, setName] = useState(groupName)


  const imageText = url ? '画像を変更する' : '画像を追加する'

  const handleChangeName = (value: string) => {
    setName(value)
  }

  const handleOnSubmit = () => {
    requestPatchGroupInfo({ imageUrl: url, groupName: name })
    navigation.goBack()
  }

  const handleImageUpload = () => {
    ImageUpload(setProgress, setUrl, undefined, id)
  }

  const renderGroupImage = url ?
    <GroupImage url={url} width={90} height={90} /> :
    <UnSettingGroupImage urls={groupUsersImages} width={90} height={90} />

  return (
    <Container>
      <ImageContainer>
        <ImageWrapper onPress={handleImageUpload}>
          {renderGroupImage}
        </ImageWrapper>
        <ImageTextButton onPress={handleImageUpload}>
          <ImageText>{progress || imageText}</ImageText>
        </ImageTextButton>
      </ImageContainer>
      <FromWrapper>
        <Label>グループ名</Label>
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
  padding: 30px 0;
`

const ImageContainer = styled.View`
`

const ImageWrapper = styled.TouchableOpacity`
  align-self: center;
  width: 100px;
  height: 100px;
`

const ImageTextButton = styled.TouchableOpacity`
  align-self: center;
  padding: 5px 0;
  width: 150px;
`

const ImageText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`

const FromWrapper = styled.View`
  padding: 20px 0 30px 0;
`

const ButtonWrapper = styled.View``