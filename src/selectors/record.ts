import { useSelector, shallowEqual } from 'react-redux'
// import types
import { RecordState } from '../types/Record'
import { RootState } from '../reducers'

const recordSelector = (): RecordState => {
  return useSelector((state: RootState) => state.records, shallowEqual)
}

export const selectEmojiReactions = (recordId: string) => {
  const { emojiReactions } = recordSelector()
  const reactions = emojiReactions.filter(reaction => reaction.recordId === recordId)
  return reactions[0]
}

export default recordSelector