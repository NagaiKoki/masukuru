import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../../constants/Styles'

interface RecordReactionProps {
  size: number
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size } = props

  return (
    <RecordReactionWrapper>
      <RecordReactionUpper>
        <Icon name="comment-o" size={18} style={{ color: COLORS.BASE_BLACK }} />
        <RecordReactionTitle>コメント</RecordReactionTitle>
        <RecordReactionSizeText>{size}</RecordReactionSizeText>
      </RecordReactionUpper>
    </RecordReactionWrapper>
  )
}

const RecordReactionWrapper = styled.View`  
  background-color: ${COLORS.BASE_WHITE};
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 10px 0;
`

const RecordReactionUpper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const RecordReactionTitle = styled.Text`
  margin: 0 7px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 15px;
`

const RecordReactionSizeText = styled.Text`
  font-size: 13px;
  color: ${COLORS.SUB_BLACK};
`

export default RecordReaction