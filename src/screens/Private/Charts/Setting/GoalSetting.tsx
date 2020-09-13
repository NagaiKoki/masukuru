import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
// slice
import { requestPostChartSetting } from '../../../../slice/chart'
// import components
import SpinnerOverlay from '../../../../common/Loading/SpinnerOverlay'

const GoalSetting = ({ navigation }) => {
  const [weightGoalText, setWeightGoal] = useState<number>()
  const [isLoadingVisible, setIsLoadingVisible] = useState(false)
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => {
          return (
            <AddTextButton onPress={handleOnSubmit}>
              <AddText>保存</AddText>
            </AddTextButton>
          )
        }
      })
    }, [weightGoalText])
  )

  const handleInVisibleLoading = () => {
    setIsLoadingVisible(false)
  }

  const handleOnSubmit = () => {
    setIsLoadingVisible(true)
    setTimeout(() => {
      dispatch(requestPostChartSetting({ weightGoal: weightGoalText }))
      handleInVisibleLoading()
      navigation.goBack()
    }, 2000)
  }

  if (isLoadingVisible) {
    return (
      <SpinnerOverlay 
        visible={isLoadingVisible}
        handleInVisible={handleInVisibleLoading}
      />
    )
  }

  return (
    <Container>
      <Title>体重</Title>
      <Wrapper>
        <Label>目標値</Label>
        <Form 
          placeholder="50"
          autoCapitalize={'none'}
          maxLength={3}
          value={weightGoalText}
          onChangeText={(value: number) => setWeightGoal(value)}
          returnKeyType="done"
          keyboardType={'numeric'}
          autoCorrect={ false }
        />
        <UnitText>kg</UnitText>
      </Wrapper>
    </Container>
  )
}

export default GoalSetting

const Container = styled.View`
  flex: 1;
  padding: 40px 0;
  background: ${COLORS.BASE_BACKGROUND};
`

const AddTextButton = styled.TouchableOpacity`
  margin-right: 20px;
`

const AddText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
  font-weight: bold;
`


const Title = styled.Text`
  margin: 0 0 20px 15px;
  font-weight: bold;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${COLORS.BASE_WHITE};
  border-top-color: ${COLORS.BORDER_COLOR_1};
  border-top-width: 1;
  border-bottom-color: ${COLORS.BORDER_COLOR_1};
  border-bottom-width: 1;
  padding: 10px 15px;
`

const Label = styled.Text`
  margin-right: 40px;
  font-size: 15px;
  color: ${COLORS.BASE_BLACK};
`

const Form = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  height: 40px;
  width: 70px;
  margin: 10px 0;
  margin-right: 10px;
  padding: 5px 15px;
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const UnitText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`