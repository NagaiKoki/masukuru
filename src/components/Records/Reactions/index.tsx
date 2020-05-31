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
        <Icon name="comment-o" size={20} style={{ color: COLORS.BASE_BLACK }} />
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
`

const RecordReactionSizeText = styled.Text`
  font-size: 14px;
  color: ${COLORS.SUB_BLACK};
  margin-left: 5px;
`

export default RecordReaction