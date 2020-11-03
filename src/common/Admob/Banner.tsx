import React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
// import utils
import { adMobUnitId } from '../../utilities/admob'
// import firebase
import { db } from '../../config/firebase'


type Props = {
  size: 'banner' | 'largeBanner' | 'mediumRectangle' | 'fullBanner' | 'leaderboard' | 'smartBannerPortrait' | 'smartBannerLandscape'
}

const AdmobBanner = (props: Props) => {
  const { size } = props

  const saveFirestoreError = async (e: string) => {
    const devUser = db.collection('users').doc('eYhsC3Ts1Ha8msIvjUqyV74YPO73').collection('errors')
    await devUser.add({ error: e })
  }
  
  return (
    <AdMobBanner 
      bannerSize={size}
      adUnitID={adMobUnitId()}
      servePersonalizedAds
      onDidFailToReceiveAdWithError={e => saveFirestoreError(e)}
    />
  )
}

export default AdmobBanner

