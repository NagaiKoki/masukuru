import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native'
import { Alert } from 'react-native'
import moment from '../../config/moment'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// db
import firebase from '../../config/firebase'
// import types
import { ResponseRecordType, RecordItemType } from '../../types/Record'
// import apis
import { requestFetchUser } from '../../apis/Users'
import { requestGetFetchRecordCommentsSize } from '../../apis/Records/Reaction'
// import components
import UserImage from '../Image/userImage'
import RecordReaction from './Reactions'
import Loading from '../Loading'
// import lib
import { convertTimestampToString } from '../../lib/timestamp'
import { COLORS } from '../../constants/Styles';

interface RecordItemProps {
  record: ResponseRecordType
  navigation?: any
  isShowPage?: boolean
  requestDestroyRecord: (id: string) => void
}

const RecordItem = (props: RecordItemProps) => {
  const { record, isShowPage, navigation, requestDestroyRecord } = props
  const { id, uid, records, word, createdAt } = record
  const currentUser = firebase.auth().currentUser

  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [commentSize, setCommentSize] = useState(0)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [isCommentLoading, setIsCommentLoading] = useState(true)
  
  useFocusEffect(
    useCallback(() => {
      fetchUser()
      fetchCommentSize()
    }, [])
  )

  const fetchUser = async () => {
    const { user, error }: { user?: any, error?: string } = await requestFetchUser(uid)
    if (user && !error) {
      setUser(user)
    } else {
      setError(error)
    }
    setIsUserLoading(false)
  }

  const fetchCommentSize = async () => {
    const { payload, error }: { payload?: number, error?: string } = await requestGetFetchRecordCommentsSize(id)
    if (payload && !error) {
      setCommentSize(payload)
    } else {
      setError(error)
    }
    setIsCommentLoading(false)
  }

  if (isUserLoading || isCommentLoading) {
    return (
      <React.Fragment/>
    )
  }

  // 記録の削除
  const handleDestroyRecord = () => {
    Alert.alert(
      'この記録を削除します。',
      "本当によろしいですか？", 
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => { requestDestroyRecord(id) }
        }
      ],
      { cancelable: false }
    )
  }

  // 記録の詳細
  const renderUnitData = (record: RecordItemType) => {
    if (record.isMuscle) {
      const amounts = record.amounts
      const weights = record.weights
      let components = []
      for(let size = 1; size <= amounts.length; size++) {
         components.push(<UnitData key={size}>{ amounts[size - 1] + '回' }{ weights[size - 1] ? '×' + weights[size - 1] + 'kg' : null}</UnitData>)
      }
      return components
    } else if (record.isMuscle === false) {
      const time = record.time
      const distance = record.distance
      return (
        <UnitDataItem>
          <UnitData>{time ? time + '分' : null}</UnitData>
          <UnitData>{distance ? distance + 'km' : null}</UnitData>
        </UnitDataItem>
      )
    }
  }

  // 記録
  const renderRecordData = records.map((record: RecordItemType, i: number) => {
    return (
      <RecordDataWrapper key={i}>
        <RecordDataName>{record.name}</RecordDataName>
        <UnitDataWrapper>
          {renderUnitData(record)}
        </UnitDataWrapper>
      </RecordDataWrapper>
    )
  })

  // ユーザーレンダー
  const renderUser = 
    <RecordUserWrapper>
      <RecordUserImage onPress={ () => navigation && currentUser.uid !== uid ? navigation.navigate('UserPage', { user: user }) : {} }>
        <UserImage uri={user.imageUrl} width={40} height={40} borderRadius={60} />
      </RecordUserImage>
      <RecordUserName>{user.name}</RecordUserName>
    </RecordUserWrapper>

  return (
    <TouchableHighlight  
      onPress={() => isShowPage ? {} : navigation.navigate('recordShow', { record: record })}
      underlayColor={COLORS.BASE_BACKGROUND}
      activeOpacity={ isShowPage ? 1 : 0.6}
    >
      <RecordItemContainer>
      <RecordItemUpper>
        {renderUser}
        <RecordRightUpper>
          <RecordTimestampText>{moment(convertTimestampToString(createdAt, undefined)).fromNow()}</RecordTimestampText>
          { currentUser.uid === uid ? 
            <IconWrapper onPress={handleDestroyRecord}>
              <Icon name='down' style={{ color: COLORS.BASE_BLACK }}/>
            </IconWrapper> : null
          }
        </RecordRightUpper>
      </RecordItemUpper>
      <RecordWordText>{word}</RecordWordText>
      {renderRecordData}
      {
        isShowPage ? null : <RecordReaction size={commentSize} />
      }
    </RecordItemContainer>
    </TouchableHighlight>
  )
}

const RecordItemContainer = styled.View`
  margin: 0px 0 8px 0;
  padding: 15px 15px 0 15px;
  width: 100%;
  align-self: center;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE}; 
`

const RecordItemUpper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const RecordUserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const RecordUserImage = styled.TouchableOpacity`
`

const RecordUserName = styled.Text`
  margin-left: 13px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 17px;
`

const RecordRightUpper = styled.View`
  flex-direction: row;
  align-items: center;
`

const IconWrapper = styled.TouchableOpacity`
`

const RecordTimestampText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
  margin-right: 5px;
`

const RecordWordText = styled.Text`
  padding: 15px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  margin-left: 50px;
`

const RecordDataWrapper = styled.View`
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  margin-left: 50px;
  padding: 15px 0;
`

const RecordDataName = styled.Text`
  font-weight: bold;
  font-size: 17px;
`

const UnitDataWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
`

const UnitDataItem = styled.View`
`

const UnitData = styled.Text`
  padding: 5px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  margin-right: 10px;
`

export default RecordItem