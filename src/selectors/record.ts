import { useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
// import types
import { RecordState, ResponseRecordType, RequestFetchRecordType, RequestNextRecords } from '../types/Record'
import { RootState } from '../reducers'
// import slice
import { requestFetchRecords, requestNextRecords } from '../slice/record'

const recordSelector = (): RecordState => {
  return useSelector((state: RootState) => state.records, shallowEqual)
}

export const selectEmojiReactions = (recordId: string) => {
  const { emojiReactions } = recordSelector()
  const reactions = emojiReactions.filter(reaction => reaction.recordId === recordId)
  return reactions[0]
}

export const useSelectRecordActions = () => {
  const dispatch = useDispatch()
  const _requestFetchRecords = useCallback((arg: RequestFetchRecordType) => dispatch(requestFetchRecords(arg)), [dispatch])
  const _requestNextRecords = useCallback((arg: RequestNextRecords) => dispatch(requestNextRecords(arg)), [dispatch])
  return {
    requestFetchRecords: _requestFetchRecords,
    requestNextRecords: _requestNextRecords
  }
}

export const useUserRecords = () => {
  return useSelector<RootState, ResponseRecordType[]>(state => state.records.userRecords)
}

export const useRecordIsLoading = () => {
  return useSelector<RootState, boolean>(state => state.records.isLoading)
}

export default recordSelector