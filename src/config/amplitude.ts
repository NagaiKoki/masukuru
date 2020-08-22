import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants'
// import types
import { UserPropertyType } from '../types/Analytics/amplitude'

let isInitialzed = false
const API_KEY = Constants.manifest.extra.amplitude.apiKey

export const initialize = () => {
  if (isInitialzed || !API_KEY) {
    return
  }
  Amplitude.initialize(API_KEY)
  isInitialzed = true
}

export const track = (event: string, options?: any) => {
  // if (__DEV__) return;
  initialize()
  if (options) {
    Amplitude.logEventWithProperties(event, options)
  } else {
    Amplitude.logEvent(event)
  }
}

export const getUserId = (userId) => {
  if (__DEV__) return;
  initialize()
  Amplitude.setUserId(userId)
}

export const identify = (uid: string, options?: UserPropertyType) => {

  initialize()
  Amplitude.setUserId(uid)
  if (options) {
    Amplitude.setUserProperties(options)
  }
}

export default {
  initialize,
  track,
  getUserId,
  identify
};