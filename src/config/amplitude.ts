import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants'

let isInitialzed = false
const API_KEY = Constants.manifest.extra.amplitude.apiKey

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