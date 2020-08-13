import React from 'react'
import styled from 'styled-components'
// import components
import Loading from '../../../components/Loading'
import SuggestItem from  './suggestItem'

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
`

export default SearchSuggestList