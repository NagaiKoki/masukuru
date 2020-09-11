import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import DatePicker from '../../../common/Date'
// import slice
import { requestPostWeight } from '../../../slice/chart'


const AddWeightScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date)
  const [weight, setWeight] = useState(0)
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => {
          return (
            <Icon name="close" 
              size={24} 
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          )
        },
        headerRight: () => {
          return (
            <AddTextButton onPress={handleOnSubmit}>
              <AddText>記録</AddText>
            </AddTextButton>
          )
        }
      })
    }, [weight, date])
  )

  const handleOnSubmit = () => {
    dispatch(requestPostWeight({ weight: weight, date: date }))
    navigation.goBack()
  }

  const handleOnDateChange = (date: Date) => {
    setDate(date)
  }

  return (
    <Container>
      <Wrapper>
        <DateLabel>日付</DateLabel>
        <DatePicker 
          date={date}
          border={true}
          handleOnChangeDate={handleOnDateChange}
        />
      </Wrapper>
      <Wrapper>
        <WeightLabel>体重</WeightLabel>
        <Form 
          placeholder="0"
          autoCapitalize={'none'}
          maxLength={5}
          value={weight}
          onChangeText={(value: number) => setWeight(value)}
          keyboardType={'numeric'}
          returnKeyType="done"
          autoCorrect={ false }
        />
        <UnitText>kg</UnitText>
      </Wrapper>
    </Container>
  )
}

export default AddWeightScreen

const AddTextButton = styled.TouchableOpacity`
  margin-right: 20px;
`

const AddText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
  font-weight: bold;
`

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.3;
  padding: 10px 30px;
`

const DateLabel = styled.Text`
  margin-right: 30px;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
`

const WeightLabel = styled.Text`
  margin-right: 40px;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
`

const Form = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  height: 50px;
  width: 80px;
  margin: 10px 0;
  margin-right: 10px;
  padding: 15px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`

const UnitText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`