import React, { useState , Dispatch, SetStateAction} from 'react';
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { COLORS } from '../../../constants/Styles'
// import types
import { RootState } from '../../../reducers';
// import actions
import { requestFetchSuggestRecords } from '../../../actions/Search/suggestRecord'
// import components
import SearchSuggestList from '../../../common/Search/Suggests/suggestList'
import MusclewSetBtn from './SetBtn'

interface AddRecordFormProps {
  temporaryName: string,
  amount1: number | string
  amount2: number | string
  amount3: number | string
  amount4: number | string
  amount5: number | string
  amount6: number | string
  amount7: number | string
  amount8: number | string
  amount9: number | string
  weight1: number | string
  weight2: number | string
  weight3: number | string
  weight4: number | string
  weight5: number | string
  weight6: number | string
  weight7: number | string
  weight8: number | string
  weight9: number | string
  setAmount1: Dispatch<SetStateAction<number | string>>
  setAmount2: Dispatch<SetStateAction<number | string>>
  setAmount3: Dispatch<SetStateAction<number | string>>
  setAmount4: Dispatch<SetStateAction<number | string>>
  setAmount5: Dispatch<SetStateAction<number | string>>
  setAmount6: Dispatch<SetStateAction<number | string>>
  setAmount7: Dispatch<SetStateAction<number | string>>
  setAmount8: Dispatch<SetStateAction<number | string>>
  setAmount9: Dispatch<SetStateAction<number | string>>
  setWeight1: Dispatch<SetStateAction<number | string>>
  setWeight2: Dispatch<SetStateAction<number | string>>
  setWeight3: Dispatch<SetStateAction<number | string>>
  setWeight4: Dispatch<SetStateAction<number | string>>
  setWeight5: Dispatch<SetStateAction<number | string>>
  setWeight6: Dispatch<SetStateAction<number | string>>
  setWeight7: Dispatch<SetStateAction<number | string>>
  setWeight8: Dispatch<SetStateAction<number | string>>
  setWeight9: Dispatch<SetStateAction<number | string>>
  onChangeTrainingName: (name: string) => void
}

const AddRecordForm = (props: AddRecordFormProps) => {
  const dispatch = useDispatch()
  const { isLoading, recordNames } = useSelector((state: RootState) => state.suggestRecords, shallowEqual)
  const [count, setCount] = useState(3)
  const [visibleSuggest, setVisibleSuggest] = useState(false)
  const { 
    temporaryName,
    onChangeTrainingName,
    amount1,
    amount2,
    amount3,
    amount4,
    amount5,
    amount6,
    amount7,
    amount8,
    amount9,
    weight1,
    weight2,
    weight3,
    weight4,
    weight5,
    weight6,
    weight7,
    weight8,
    weight9,
    setAmount1,
    setAmount2,
    setAmount3,
    setAmount4,
    setAmount5,
    setAmount6,
    setAmount7,
    setAmount8,
    setAmount9,
    setWeight1,
    setWeight2,
    setWeight3,
    setWeight4,
    setWeight5,
    setWeight6,
    setWeight7,
    setWeight8,
    setWeight9
  } = props

  // 回数のstate更新
  const handleSetAmount = (size: number, number: number) => {
    if (!number) return
    eval("setAmount" + size + `(${number})`)
  }

  // 重さのstate更新
  const handleSetWeight = (size: number, number: number) => {
    if (!number) return
    eval("setWeight" + size + `(${number})`)
  }

  // セット数の追加
  const handleAddSet = () => {
    if (count >= 9) return
    setCount( count + 1 )
  }

  // セット数の削除
  const handleDeleteSet = () => {
    if (count <= 1) return
    setCount( count - 1 )
  }

  const handleOnFocus = () => {
    setVisibleSuggest(true)
    dispatch(requestFetchSuggestRecords(''))
  }

  const handleOnBlur = () => {
    setVisibleSuggest(false)
  }

  const handleOnChange = (text: string) => {
    onChangeTrainingName(text)
    dispatch(requestFetchSuggestRecords(text))
  }

  const renderUnitForm = () => {
    const components = []
    for(let size = 1; size <= count; size++) {
      components.push(
        <AddRecordItem key={size}>
          <AddRecordName>{`${size}セット目`}</AddRecordName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              defaultValue={String(eval('amount' + String(size)))}
              keyboardType={'numeric'}
              autoCorrect={ false }
              onChangeText={ (text: number) => handleSetAmount(size, text) }
          />
          <AddRecordUnitName>/ 回</AddRecordUnitName>
            <AddUnitForm
              placeholder="0"
              autoCapitalize={'none'}
              maxLength={5}
              defaultValue={String(eval('weight' + String(size)))}
              keyboardType={'numeric'}
              autoCorrect={ false }
              onChangeText={ (text: number) => handleSetWeight(size, text) }
          />
        <AddRecordUnitName>/ kg</AddRecordUnitName>
      </AddRecordItem>
      )
    }
    return components
  }

  return (
    <AddRecordWrapper>
      <AddRecordItem>
        <AddRecordName>種目</AddRecordName>
        <TrainingFormWrapper>
          <TrainingNameForm
            placeholder="例）ベンチプレス"
            autoCapitalize={'none'}
            autoCorrect={ false }
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            defaultValue={temporaryName}
            onChangeText={ (text: string) => handleOnChange(text) }
          />
        </TrainingFormWrapper>
      </AddRecordItem>
       {renderUnitForm()}
      <MusclewSetBtn
        handleAddSet={handleAddSet}
        handleDeleteSet={handleDeleteSet}
      />
      <SuggestListWrapper
        isShow={visibleSuggest}
        style={{ flex: 1 }} 
        behavior="padding" 
        keyboardVerticalOffset={190}
      >
        <SearchSuggestList
          names={recordNames}
          isLoading={isLoading}
        />
      </SuggestListWrapper>
    </AddRecordWrapper> 
  )
}

const AddRecordWrapper = styled.View`
  position: relative;
  margin: 0 auto;
  width: 90%;
  padding: 20px 0 40px 0;
`

const AddRecordItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

const AddRecordName = styled.Text`
  width: 20%;
  margin-right: 25px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
  text-align: right;
`

const AddRecordUnitName = styled.Text`
  margin-right: 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const AddUnitForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 17%;
  height: 50px;
  margin: 10px 0;
  margin-right: 10px;
  padding: 15px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`

const TrainingFormWrapper = styled.View`
  width: 70%;
  position: relative;
`

const TrainingNameForm = styled.TextInput`
  align-self: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin: 8px 0;
  padding: 15px;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
`

const AddSetWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`

const AddSetText = styled.Text`
  margin-right: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const AddSetBtn = styled.TouchableOpacity``

const SuggestListWrapper = styled.KeyboardAvoidingView<{ isShow: boolean }>`
  display: ${props => props.isShow ? 'flex' : 'none'};
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${COLORS.BASE_WHITE};
`

export default AddRecordForm