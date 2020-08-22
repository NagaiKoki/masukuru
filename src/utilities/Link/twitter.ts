import { Linking } from 'expo'
import Constants from 'expo-constants'

type SnsType = 'Twitter' | 'Line'

export const openIviteCodeShareLinkWithSNS = (code: string, type: SnsType) => {
  const appStoreUrl = Constants.manifest.ios.appStoreUrl
  const text = `招待コード: 【${code}】\n\n👇のリンクからマスクルをインストールして、一緒にトレーニングを頑張ろう！\n\n`
  let url: string

  if (type === 'Twitter') {
    url = `https://twitter.com/intent/tweet?url=${appStoreUrl}&hashtags=マスクル&text=${text}`
    
  } else if (type === 'Line') {
    const lineText = text + appStoreUrl
    url = `https://line.me/R/msg/text/?${lineText}`
  }
  return Linking.openURL(url)
}