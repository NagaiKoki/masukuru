import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { TouchableHighlight, Image, StyleSheet, Dimensions, Alert } from 'react-native'
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
import SettingModal from '../SettingModal/list'
// import utils
import { convertTimestampToString } from '../../../utilities/timestamp'
// import constants
import { COLORS } from '../../../constants/Styles';
import { requestDestroyRecord } from '../../../slice/record'

interface RecordItemProps {
  record: ResponseRecordType
  navigation?: any
  isShowPage?: boolean
}

const RecordItem = (props: RecordItemProps) => {
  const { record, isShowPage, navigation } = props
  const { id, uid, records, word, imageUrl, createdAt } = record
  const currentUser = firebase.auth().currentUser
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [commentSize, setCommentSize] = useState(0)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [isCommentLoading, setIsCommentLoading] = useState(true)
  const [visibleModal, setVisibleModal] = useState(false)

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

  const deleteRecordWithAlert = () => {
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
          onPress: () => {dispatch(requestDestroyRecord(id))}
        }
      ],
      { cancelable: false }
    )
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
        <RecordNameWrapper>
          <RecordIconBlcok />
          <RecordDataName>{record.name}</RecordDataName>
        </RecordNameWrapper>
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
            <IconWrapper onPress={ () => setVisibleModal(true) }>
              <Icon name='ellipsis1' size={25} style={{ color: COLORS.BASE_BLACK, fontWeight: 'bold', marginTop: -10, marginRight: 5 }}/>
            </IconWrapper> : null
          }
          <RecordTimestampText>{moment(convertTimestampToString(createdAt, undefined)).fromNow()}</RecordTimestampText>
        </RecordRightUpper>
      </RecordItemUpper>
      { !!word ? <RecordWordText>{word}</RecordWordText> : null }
      <RecordImageWrapper>
        { imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} resizeMode={'cover'} /> : null }  
      </RecordImageWrapper>
      <TrainingDate 
        date={record.trainingDate}
        createdAt={record.createdAt}
        hasWord={!!word}
      />
      {renderRecordData}
      { isShowPage ? null : <RecordReaction size={commentSize} /> }
      <SettingModal 
        recordId={record.id}
        visibleModal={visibleModal}
        navigation={navigation}
        setVisibleModal={setVisibleModal}
        deleteRecordWithAlert={deleteRecordWithAlert}
      />
    </RecordItemContainer>
    </TouchableHighlight>
  )
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
      height: 200,
      width: 200,
      borderRadius: 15,
      backgroundColor: '#d1d1cf'
  }
});

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

const RecordNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const RecordIconBlcok = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${COLORS.BASE_MUSCLEW};
`

const RecordDataName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 17px;
  margin: 5px 0 3px 12px;
`

const UnitDataWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 0 5px 0;
`

const RecordImageWrapper = styled.View`
  margin-left: 50px;
  margin-bottom: 15px;
`

export default RecordItem