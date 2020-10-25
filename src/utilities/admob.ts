import Constants from 'expo-constants'

export const adMobUnitId = (): string => {
  const testId = 'ca-app-pub-3940256099942544/2934735716'
  const productionId = Constants.manifest.ios.config.googleMobileAdsAppId

  const unitId = Constants.isDevice && !__DEV__ ? productionId : testId
  return unitId
}