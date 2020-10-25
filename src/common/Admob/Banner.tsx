import React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
// import utils
import { adMobUnitId } from '../../utilities/admob'

type Props = {
  size: 'banner' | 'largeBanner' | 'mediumRectangle' | 'fullBanner' | 'leaderboard' | 'smartBannerPortrait' | 'smartBannerLandscape'
}

const AdmobBanner = (props: Props) => {
  const { size } = props

  return (
    <AdMobBanner 
      bannerSize={size}
      adUnitID={adMobUnitId()}
      servePersonalizedAds
    />
  )
}

export default AdmobBanner

