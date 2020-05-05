import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import firebase, { db } from '../../config/firebase';
import { COLORS } from '../../constants/Styles';
import Analitycs from '../../config/amplitude'
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import RNPickerSelect from 'react-native-picker-select';
import { factoryRandomCode } from '../../lib/randomTextFactory';

const Event = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;
  const currentUserId = currentUser.uid
  const today = new Date();
  const [isLoading, setIsLoading] = useState(true)
  const [eventList, setEventList] = useState([]);
  const [eventModal, setEventModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('')

  useFocusEffect(
    useCallback(() => {
      GetEventList(currentUserId)
    },[])
  );

  const AddEvent = () => {
    const id = factoryRandomCode(10)
    db.collection('users').doc(currentUserId).collection('events').doc(id).set({
      id: id,
      name: eventName,
      uid: currentUserId,
      date: today.getTime(),
      category: eventCategory
    }).then(function() {
      setEventList(state => [ ...state, {id: id, name: eventName, uid: currentUserId, date: today.getTime(), category: eventCategory }]);
      Analitycs.track('add events')
      setEventModal(false);
    }).catch(function(error) {
      alert(error);
    })
  }

  const GetEventList = (userId) => {
    let list = []
    db.collection('users').doc(userId).collection('events')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const data = doc.data()
        list.push(data)})
      setEventList(list)
      setIsLoading(false)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" style={[styles.loading]} />
      </LoadingContainer>
    )
  }

  const eventCategorySelectForm = () => {
    const items = [{ label: '胸', value: 'pectoral' }, { label: '背中', value: 'spine' }, { label: '腕', value: 'arm' }, { label: '腹', value: 'abdominal' }, { label: '下半身', value: 'lower' } ]
    return (
      <SelectWrapper>
        <SelectLabel>種類を選択（必須）</SelectLabel>
        <RNPickerSelect
          items={items}
          placeholder={{ label: '選択してください', value: '' }} 
          onValueChange={ category => setEventCategory(category) }
          style={pickerSelectStyles}
          Icon={() => (<Text style={{ position: 'absolute', right: 35, top: 10, fontSize: 18, color: COLORS.SUB_BLACK }}>▼</Text>)}
        />
      </SelectWrapper>
    )
  }

  const EventFlatListDisplay = (
    eventList.length == 0 ?
    <NoneEventListText>
       まずはトレーニングを追加しよう！
    </NoneEventListText>
                          :
    <EventFlatList
      data={eventList}
      extraData={eventList}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => 
        <EventFlatListButton onPress={ () => { navigation.navigate('menu', { item: item, currentUser: currentUser }) }}>
          <EventFlatListText>
            {item.name} の記録
          </EventFlatListText>
          <Icon name="right" size={20} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: 20, color: '#808080' }}/>
        </EventFlatListButton>
      }
    />
  );

  return (
    <EventView>
        <EventPlus>
          <EventTitle>
            トレーニングリスト
          </EventTitle>
          <EventPlusButton onPress={ () => setEventModal(true) }>
            <EventPlusButtonText>
              + 追加する
            </EventPlusButtonText>
          </EventPlusButton>
          <Modal
            isVisible={eventModal}
            >
            <EventModalView>
              <EventModalCloseButton onPress={ () => setEventModal(false) }>
                <Icon name="close" size={30} color={COLORS.BASE_BLACK} />
              </EventModalCloseButton>
              <EventModalTitle>
                どんなトレーニングを追加しますか？
              </EventModalTitle>
              {eventCategorySelectForm()}
              <EventAddForm 
                placeholder='例）ベンチプレス'
                autoCapitalize={'none'}
                autoCorrect={ false }
                onChangeText={ text => setEventName(text) }
              />
              <EventSubText>※ 4文字以上</EventSubText>
              <EventAddButton onPress={ () => AddEvent() }>
                <EventAddText>
                  追加する
                </EventAddText>
              </EventAddButton>
            </EventModalView>
          </Modal>
        </EventPlus>
        
        <EvetnListView>
          {EventFlatListDisplay}
        </EvetnListView>
      </EventView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND,
    paddingTop: 10
  }
})

const LoadingContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
`

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.BASE_BORDER_COLOR,
    borderRadius: 4,
    color: COLORS.BASE_BLACK,
    paddingRight: 30,
    backgroundColor: COLORS.BASE_WHITE,
    width: '90%',
    alignSelf: 'center'
  },
})

const SelectWrapper = styled.View`
`

const SelectLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  font-weight: bold;
  width: 90%;
  margin: 0 auto;
  padding: 30px 0 10px 0;
`

const EventView = styled.View`
  padding: 0 15px;
`

const EventPlus = styled.View`
  margin: 30px 0 0 0;
  flex-direction: row;
  justify-content: space-between;
`

const EventTitle = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`

const EventPlusButton = styled.TouchableOpacity`
`

const EventPlusButtonText = styled.Text`
  margin-right: 10px;
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  font-size: 18px;
`

const EventModalView = styled.View`
  height: 430px;
  border-radius: 10px;
  background-color: #fff;
`

const EventModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
`

const EventModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const EventAddForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  align-self: center;
  border-radius: 5px;
  padding: 15px 15px;
  color: ${COLORS.BASE_BLACK};
  margin: 30px 0 10px 0;
`

const EventSubText = styled.Text`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 30px;
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
`

const EventAddButton = styled.TouchableOpacity`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 10px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const EventAddText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`

const EvetnListView = styled.View`
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
  padding-bottom: 10px;
`

const NoneEventListText = styled.Text`
  text-align: center;
  margin-top: 50px;
  font-size: 15px;
  font-weight: bold;
  color: #808080;
`

const EventFlatList = styled.FlatList`
`

const EventFlatListButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #FFF;
  border: 1px solid #e9e9e9;
  height: 75px;
  border-radius: 5px;
  flex-direction: row;
`

const EventFlatListText = styled.Text`
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
  align-self: flex-start;
  margin-left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.BASE_BLACK};
`

export default Event;