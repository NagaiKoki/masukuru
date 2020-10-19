import React, { useState } from 'react'
import styled from 'styled-components'
// import selectors
import { useUserSelectors } from '../../../selectors/user'
// import components
import Button from '../../../common/Button'
import NumberForm from '../../../common/Form/NumberForm'
import SelectGenderBtns from '../../../components/Tutorial/SelectGender'
import StepTitle from '../../../components/Tutorial/StepTitle'
// import constants
import { COLORS } from '../../../constants/Styles'

type GenderType = '男性' | '女性' | 'その他' | ''

const TutorialBasicInfo = ({ navigation }) => {
  const [gender, setGender] = useState<GenderType>('')
  const [userAge, setUserAge] = useState<number>(null)
  const { currentUser, requestUpdateUser } = useUserSelectors()

  const handleOnSelectGender = (gender: GenderType) => {
    setGender(gender)
  }

  const handleOnAgeChange = (value: number) => {
    setUserAge(value)
  }

  const disabled = !gender

  const handleOnSubmit = () => {
    requestUpdateUser({ ...currentUser, sex: gender, age: String(userAge) })
    navigation.navigate('TutorialUserImage')
  }

  return (
    <Container>
      <Wrapper>
        <SelectWrapper>
          <StepTitle 
            title="基本情報を設定しよう！"
            stepCount={2}
          />
          <GenderWrapper>
            <LabelWrapper>
              <FormLabel>性別</FormLabel>
            </LabelWrapper>
            <SelectGenderBtns
              selectItem={gender}
              onClick={handleOnSelectGender}
            />
          </GenderWrapper>
          <AgeWrapper>
            <LabelWrapper>
              <FormLabel>年齢</FormLabel>
              <SubLabel>(任意)</SubLabel>
            </LabelWrapper>
            <FormWrapper>
              <NumberForm 
                placeholder="20"
                maxLength={3}
                onChange={handleOnAgeChange}
              />
              <UnitLabel>歳</UnitLabel>
            </FormWrapper>
          </AgeWrapper>
        </SelectWrapper>
        <Button 
          text='次へ'
          fontSize={16}
          bold={true}
          disabled={disabled}
          padding='15px 0'
          handleOnClick={handleOnSubmit}
        />
      </Wrapper>
    </Container>
  )
}

export default TutorialBasicInfo

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 30px 15px;
`

const SelectWrapper = styled.View`
  padding: 0 10px;
`

const GenderWrapper = styled.View`
  padding-top: 20px;
`

const AgeWrapper = styled.View`
  margin: 0px 0 20px 0;
`

const FormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 70px;
`

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`

const FormLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
`

const SubLabel = styled.Text`
  padding-left: 10px;
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
`

const UnitLabel = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
`