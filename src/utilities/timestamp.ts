import { Timestamp } from '@firebase/firestore-types';
import firebase from '../config/firebase'

export const convertTimestampToString = (date?: Timestamp, jsDate?: Date) => {
  if (date) {
    const time = new Date(date.seconds * 1000);
    const year = time.getFullYear();
    const month = (`0${time.getMonth() + 1}`).slice(-2);
    const day = (`0${time.getDate()}`).slice(-2);
    const hour = (`0${time.getHours()}`).slice(-2);
    const min = (`0${time.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day} ${hour}:${min}`;
  } else {
    const time = new Date(jsDate)
    const year = time.getFullYear();
    const month = (`0${time.getMonth() + 1}`).slice(-2);
    const day = (`0${time.getDate()}`).slice(-2);
    const hour = (`0${time.getHours()}`).slice(-2);
    const min = (`0${time.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day} ${hour}:${min}`;
  }
}

export const convertTimeStampToStringOnlyDate = (date?: Timestamp, jsDate?: Date) => {
  if (date) {
    const time = new Date(date.seconds * 1000);
    const year = time.getFullYear();
    const month = (`0${time.getMonth() + 1}`).slice(-2);
    const day = (`0${time.getDate()}`).slice(-2);
    return `${year}/${month}/${day}`;
  } else {
    const time = new Date(jsDate)
    const year = time.getFullYear();
    const month = (`0${time.getMonth() + 1}`).slice(-2);
    const day = (`0${time.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

export const getDayOfStortToday = (date: Date) => {
  return new Date(date.setHours(0, 0, 0, 0))
}

export const convertFirebaseTimeStamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date)
}