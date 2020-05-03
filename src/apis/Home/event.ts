import { Dispatch, SetStateAction } from 'react'
import { db } from '../../config/firebase';
import Analitycs from '../../config/amplitude'
// import types
import { EventType } from '../../types/event'

export const getEventList = (groupId: string, setEventList: Dispatch<SetStateAction<EventType[]>>) => {
  let list = []
    db.collection('groups').doc(groupId).collection('events')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data()
        list.push(data)})
      setEventList(list)
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    })
}

export const addEvent = (currentGroupId: string, eventName: string, current_user_uid: string, setEventList: Dispatch<SetStateAction<EventType[]>>, setEventModal: Dispatch<SetStateAction<boolean>>) => {
  const today = new Date();
  db.collection('groups').doc(currentGroupId).collection('events').add({
    name: eventName,
    uid: current_user_uid,
    groupId: currentGroupId,
    date: today.getTime()
  }).then(function() {
    setEventList(state => [ ...state, {name: eventName, uid: current_user_uid, date: today.getTime(), groupId: currentGroupId }]);
    Analitycs.track('add events')
    setEventModal(false);
  }).catch(function(error) {
    alert(error);
  })
}