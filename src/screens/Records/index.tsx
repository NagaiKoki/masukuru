import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, RefreshControl } from 'react-native'
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase, { db } from '../../config/firebase'
// import types
import { RecordProps } from '../../containers/records/record'
// import components
import RecordList from '../../components/Records/recordList'


const RecordScreen = (props: RecordProps) => {
  const { navigation, records, actions } = props
  const { recordData, isLoading } = records
  const { requestFetchRecords, requestNextRecords } = actions
  const currentUser = firebase.auth().currentUser
  const lastRecord = recordData[recordData.length - 1]
  const [isRefresh, setIsRefresh] = useState(false)

  useFocusEffect(
    useCallback(() => {
      requestFetchRecords(currentUser.uid)
    }, [])
  )

  const onRefresh = () => {
    setIsRefresh(true)
    requestFetchRecords(currentUser.uid)
    setIsRefresh(false)
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <RecordContainer>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            requestNextRecords(currentUser.uid, lastRecord)
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl 
            refreshing={isRefresh}
            onRefresh={onRefresh}
          />
        }
      >
        <RecordList recordData={recordData} isLoading={isLoading} />
      </ScrollView>
      <EventAddBtn onPress={() => navigation.navigate('recordModal') }>
        <Icon name="plus" size={30} style={{ color: '#fff', marginTop: 4 }} />
      </EventAddBtn>
    </RecordContainer>
  )
}

const RecordContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const EventAddBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  position: absolute;
  bottom: 10%;
  right: 5%;
`

export default RecordScreen