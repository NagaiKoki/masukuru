import React from 'react'
import styled from 'styled-components'
// import components
import Loading from '../../../components/Loading'
import SuggestItem from  './suggestItem'
import { COLORS } from '../../../constants/Styles'

interface SearchSuggestProps {
  names: string[]
  isLoading: boolean
}

const SearchSuggestList = (props: SearchSuggestProps) => {
  const { names, isLoading } = props

  if (isLoading) {
    return (
      <Loading size='small' />
    )
  }

  const suggests = names.map(name => (
    <SuggestItem name={name} />
  ))

  return (
    <ListWrapper>
      {suggests}
    </ListWrapper>
  )
}

const ListWrapper = styled.View`  
  background: ${COLORS.BASE_WHITE};
  border-right-color: ${COLORS.BASE_BORDER_COLOR};
  border-right-width: 1px;
  border-left-color: ${COLORS.BASE_BORDER_COLOR};
  border-left-width: 1px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 1px;
  width: 100%;
`

export default SearchSuggestList