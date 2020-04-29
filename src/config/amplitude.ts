import * as Amplitude from 'expo-analytics-amplitude';

let isInitialzed = false
const API_KEY = '6689a653193f8642ab2354f78bc7de4c'

export const initialize = () => {
  if (isInitialzed || !API_KEY) {
    return
  }
  Amplitude.initialize(API_KEY)
  isInitialzed = true
}

export const track = (event) => {
  initialize()
  Amplitude.logEvent(event)
}

export const getUserId = (userId) => {
  initialize()
  Amplitude.setUserId(userId)
}

export default {
  initialize,
  track,
  getUserId
};