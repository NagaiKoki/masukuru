import React from 'react';
import { ScrollView } from 'react-native';
import { COLORS } from '../../../constants/Styles';
import styled from 'styled-components'
// import lib
import { convertTimestampToString } from '../../../utilities/timestamp'
// import components
import Image from '../../../components/Image/userImage'


const NotificationContentScreen = ({ route }) => {
  const { item } = route.params
  const { title, createdAt, contents, imageUrl } = item
  const time = convertTimestampToString(createdAt, undefined)

  return (
    <ScrollView>
      <ContentWrapper>
        <ContentTitle>{title}</ContentTitle>
        <ContentTimestamp>{time}</ContentTimestamp>
        <ContentMain>{contents.replace(/\s\s/g, '\n')}</ContentMain>
        { imageUrl ? 
        <ImageWrapper>
          <Image uri={imageUrl} width={300} height={200} borderRadius={8} />
        </ImageWrapper> : null }
      </ContentWrapper>
    </ScrollView>
  )
}

export default NotificationContentScreen;

const ContentWrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 30px 10px;
`

const ContentTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
`

const ContentTimestamp = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  text-align: right;
  padding: 10px;
`

const ContentMain = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  padding: 20px 0;
`

const ImageWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`