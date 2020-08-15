import React from 'react'
import styled from 'styled-components'
import { Keyboard } from 'react-native'
// import components
import Loading from '../../../components/Loading'
import SuggestItem from  './suggestItem'
// import constants
import { COLORS } from '../../../constants/Styles'


interface SearchSuggestProps {
  names: string[]
  isLoading: boolean
  handleOnChange: (keyword: string) => void
}

const SearchSuggestList = (props: SearchSuggestProps) => {
  const { names, isLoading, handleOnChange } = props

  if (isLoading) {
    return (
      <Loading size='small' />
    )
  }

  const suggests = names.map((name: string, index: number) => (
    <SuggestItem key={index} name={name} handleOnChange={handleOnChange} />
  ))

  return (
    <ListWrapper>
      <CloseItemWrapper>
        <CloseItemTextWrapper onPress={ () => Keyboard.dismiss() }>
          <CloseItemText>閉じる</CloseItemText>
        </CloseItemTextWrapper>
      </CloseItemWrapper>
      {suggests}
    </ListWrapper>
  )
}

const ListWrapper = styled.View`  
  background: ${COLORS.BASE_WHITE};
  width: 120%;
  align-self: center;
`

const CloseItemWrapper = styled.View`
  padding: 7px 30px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
`

const CloseItemTextWrapper = styled.TouchableOpacity`
`

const CloseItemText = styled.Text`
  text-align: right;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

export default SearchSuggestList