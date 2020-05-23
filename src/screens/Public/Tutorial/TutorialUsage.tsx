import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import { Image, View, ScrollView, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';

const TutorialUsageScreen = ({navigation, userName}) => {

  const rendeFIrstView =
    <ScrollView>
      <UsageWrapper1>
      <UsageTitle>マスクルへようこそ！</UsageTitle>
      <UsageImageWrapper>
        <Image source={ require('../../../assets/tutorialUsagePic.jpg')} style={{width: '85%', height: 180, resizeMode: 'cover', alignSelf: 'center', borderRadius: 5 }} />
      </UsageImageWrapper>
      <UsageTextWrapper>
        <UsageText>マスクルで仲間と一緒に理想の体型を目指そう！{"\n"}{"\n"}</UsageText>
        <UsageText>これから、マスクルの使い方をかんたんに説明するよ！</UsageText>
      </UsageTextWrapper>
    </UsageWrapper1>
  </ScrollView>

  const renderSecondView =
    <ScrollView>
      <UsageWrapper2>
      <UsageTitle2>きろくの付け方 ①</UsageTitle2>
      <UsageTextWrapper3>
        <UsageText>「きろく」タブをクリックします。</UsageText>
        <UsageText>{"\n"}そこから、ベンチプレスなど、好きなトレーニングを追加します。</UsageText>
        <UsageImageWrapper2>
          <Image source={ require('../../../assets/tutorialUsageAddTraining.png')} style={{width: '100%', height: 400, resizeMode: 'cover', alignSelf: 'center', borderRadius: 5 }} />
        </UsageImageWrapper2>
      </UsageTextWrapper3>
    </UsageWrapper2>
  </ScrollView>

  const renderThirdView =
    <ScrollView>
      <UsageWrapper3>
        <UsageTitle2>きろくの付け方 ②</UsageTitle2>

        <UsageTextWrapper3>
          <UsageText>トレーニングリストに、先程入力したトレーニングが追加されます。</UsageText>
          <UsageText>{"\n"}{"\n"}そのトレーニングをタップして、その日の記録を残しましょう！</UsageText>
          <UsageImageWrapper2>
            <Image source={ require('../../../assets/tutorialUsageAddMenu.png')} resizeMode="cover" style={{width: '100%', height: 400, resizeMode: 'cover', alignSelf: 'center', borderRadius: 5 }} />
          </UsageImageWrapper2>
       </UsageTextWrapper3>
      </UsageWrapper3>
    </ScrollView>

  const renderForthView =
    <ScrollView>
      <UsageWrapper3>
        <UsageTitle2>グループで記録を共有</UsageTitle2>

        <UsageTextWrapper3>
          <UsageText>その日の記録を追加すると、グループの中でシェアされます。</UsageText>
          <UsageText>{"\n"}{"\n"}部位ごとに、詳細な記録が表示されます。</UsageText>
          <UsageImageWrapper2>
            <Image source={ require('../../../assets/tutorialUsageHome2.png')} resizeMode="cover" style={{width: '100%', height: 500, resizeMode: 'cover', alignSelf: 'center', borderRadius: 5 }} />
          </UsageImageWrapper2>
      </UsageTextWrapper3>
      </UsageWrapper3>
    </ScrollView>

  return (
    <UsageContainer>
      <StatusBar barStyle="light-content" />
      <Swiper 
        dot={ <View style={{ backgroundColor: COLORS.FORM_BACKGROUND,  width: 8, height: 8, borderRadius: 60, marginLeft: 7, marginRight: 7  }} /> }
        activeDot={ <View style={{ backgroundColor: COLORS.BASE_MUSCLEW,  width: 8, height: 8, borderRadius: 60, marginLeft: 7, marginRight: 7 }} /> }
        paginationStyle={{
          bottom: -30
        }}
        loop={false}
      >
        {rendeFIrstView}
        {renderSecondView}
        {renderThirdView}
        <React.Fragment>
          {renderForthView}
          <UsageNextBtn onPress={() => { navigation.replace('TutorialGroupMake', { userName: userName }) }}>
            <UsageNextText>グループの作成へ</UsageNextText>
            <Icon name="right" size={20} style={{ color: '#fff', marginLeft: 10 }} />
          </UsageNextBtn>
        </React.Fragment>
      </Swiper>
    </UsageContainer>
  )
}

const UsageContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 80px 0;
`

const UsageWrapper1 = styled.View`
`

const UsageWrapper2 = styled.View`

`

const UsageWrapper3 = styled.View`

`

const UsageTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 50px;
  text-align: center;
`

const UsageTitle2 = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 20px;
  text-align: center;
`

const UsageImageWrapper = styled.View`
`

const UsageImageWrapper2 = styled.View`
  border: 1px;
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-radius: 5px;
  margin-top: 20px;
`

const UsageText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  text-align: center;
`

const UsageTextWrapper = styled.View`
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
`

const UsageTextWrapper3 = styled.View`
  width: 90%;
  padding-top: 30px;
  margin: 0 auto;
`

const UsageNextBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  margin-top: 50px;
  padding: 25px 0;
  background-color: ${COLORS.BASE_MUSCLEW};
`

const UsageNextText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`

export default TutorialUsageScreen