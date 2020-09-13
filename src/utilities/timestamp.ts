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

export const convertTimeStampToStringOnlyMonthAndDate = (firebaseDate: Timestamp) => {
  const time = new Date(firebaseDate.seconds * 1000);
  const month = (`0${time.getMonth() + 1}`).slice(-2);
  const day = (`0${time.getDate()}`).slice(-2);
  return `${month}/${day}`;
}

export const getDayOfStortToday = (date: Date) => {
  return new Date(date.setHours(0, 0, 0, 0))
}

export const convertFirebaseTimeStamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date)
}

export const getLastWeekDay = (date: Date) => {
  const dt = new Date(date)
  const lastWeek = dt.setDate(dt.getDate() - 6)
  return new Date(lastWeek)
}

export const getNextWeekDay = (date: Date) => {
  const dt = new Date(date)
  const nextWeek = dt.setDate(dt.getDate() + 6)
  return new Date(nextWeek)
}

export const getLastMonthDay = (date: Date) => {
  const dt = new Date(date)
  const lastMonth = dt.setDate(dt.getDate() - 31)
  return new Date(lastMonth)
}

export const getNextMonthDay = (date: Date) => {
  const dt = new Date(date)
  const nextMonth = dt.setDate(dt.getDate() + 31)
  return new Date(nextMonth)
}

export const getLastYearDay = (date: Date) => {
  const dt = new Date(date)
  const lastYear = dt.setDate(dt.getDate() - 365)
  return new Date(lastYear)
}

export const getNextYearDay = (date: Date) => {
  const dt = new Date(date)
  const nextYear = dt.setDate(dt.getDate() + 365)
  return new Date(nextYear)
}

export const getMidnightTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() + 1

  return new Date(year, month, day)
}