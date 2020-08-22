import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native'
import moment from '../../../config/moment'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// db
import firebase from '../../../config/firebase'
// import types
import { ResponseRecordType, RecordItemType } from '../../../types/Record'
// import apis
import { requestFetchUser } from '../../../apis/Users'
import { requestGetFetchRecordCommentsSize } from '../../../apis/Records/Reaction'
// import components
import RecordReaction from '../Reactions'
import RecordUser from './user'
import RecordData from './data'
import TrainingDate from './trainingDate'
// import utils
import { convertTimestampToString } from '../../../utilities/timestamp'
import { reactAlert } from '../../../utilities/alert'
// import constants
import { COLORS } from '../../../constants/Styles';

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
    }, [id, isShowPage])
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

  const handleRequestDestroyRecord = () => {
    requestDestroyRecord(id)
  }

  if (isUserLoading || isCommentLoading) {
    return (
      <React.Fragment/>
    )
  }

  // 記録
  const renderRecordData = records.map((record: RecordItemType, i: number) => {
    return (
      <RecordDataWrapper key={i}>
        <RecordDataName>{record.name}</RecordDataName>
        <UnitDataWrapper>
          <RecordData record={record} />
        </UnitDataWrapper>
      </RecordDataWrapper>
    )
  })
  
  return (
    <TouchableHighlight  
      onPress={() => isShowPage ? {} : navigation.navigate('recordShow', { record: record })}
      underlayColor={COLORS.BASE_BACKGROUND}
      activeOpacity={ isShowPage ? 1 : 0.6}
    >
      <RecordItemContainer>
      <RecordItemUpper>
        <RecordUser
          currentUser={currentUser}
          user={user}
          uid={uid}
          navigation={navigation}
        />
        <RecordRightUpper>
        { currentUser.uid === uid && !isShowPage ? 
            <IconWrapper onPress={ () => reactAlert(handleRequestDestroyRecord) }>
              <Icon name='ellipsis1' size={20} style={{ color: COLORS.BASE_BLACK, marginTop: -10, marginRight: 5 }}/>
            </IconWrapper> : null
          }
          <RecordTimestampText>{moment(convertTimestampToString(createdAt, undefined)).fromNow()}</RecordTimestampText>
        </RecordRightUpper>
      </RecordItemUpper>
      { !!word ? <RecordWordText>{word}</RecordWordText> : null }
      <TrainingDate 
        date={record.trainingDate}
        createdAt={record.createdAt}
        hasWord={!!word}
      />
      {renderRecordData}
      { isShowPage ? null : <RecordReaction size={commentSize} /> }
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

const RecordRightUpper = styled.View`
  justify-content: flex-end;
`

const IconWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
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
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 5px;
`

const UnitDataWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5px;
`

export default RecordItem