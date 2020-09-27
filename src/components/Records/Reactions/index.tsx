import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../../constants/Styles'
// import components
import EmojiCountList from './Emoji/CountList'
// import slices
import { toggleEmojiModalOpen, requestFetchEmojiReaction } from '../../../slice/record'
// import selectors
import { selectEmojiReactions } from '../../../selectors/record'
// import config
import Analytics from '../../../config/amplitude'

interface RecordReactionProps {
  size: number
  id: string
  isShowPage?: boolean
  handleOnNavigate: () => void
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size, id, isShowPage, handleOnNavigate } = props
  const dispatch =  useDispatch()
  const emojiReactionObj = selectEmojiReactions(id)

  useEffect(() => {
    dispatch(requestFetchEmojiReaction(id))
  }, [])

  const handleOpenEmojiModal = () => {
    Analytics.track('OpenEmojiModal')
    dispatch(toggleEmojiModalOpen({ isOpen: true, selectedRecordId: id }))
  }

  const handleNavigateRecordShow = () => {
    handleOnNavigate()
  }

  return (
    <RecordReactionWrapper>
      <RecordReactionUpper>
        { !!emojiReactionObj ? <EmojiCountList emojiReaction={emojiReactionObj} recordId={id} /> : null }
        <EmojiBtn onPress={handleOpenEmojiModal}>
          <Image
            source={require('../../../assets/emoji/emojiDefault.png') }
            style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }}
          />
        </EmojiBtn>
        { isShowPage ? null : 
          <CommentWrapper onPress={handleNavigateRecordShow}>
            <Icon name="comment" size={21} style={{ color: COLORS.BASE_BORDER_COLOR }} />
            <RecordReactionSizeText>{size}</RecordReactionSizeText>
          </CommentWrapper>
        }
      </RecordReactionUpper>
    </RecordReactionWrapper>
  )
}

const RecordReactionWrapper = styled.View`
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 7px 5px;
`

const RecordReactionUpper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const CommentWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0px 5px 5px;
`

const EmojiBtn = styled.TouchableOpacity`
  margin: 5px 10px 5px 0px;
`

const RecordReactionSizeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  font-weight: bold;
  color: ${COLORS.SUB_BLACK};
`

export default RecordReaction