import Constants from 'expo-constants';

export const isDeveloper = (uid: string) => {
  const koki = Constants.manifest.extra.developerId.koki
  const umekazu = Constants.manifest.extra.developerId.umekazu
  return uid === (koki || umekazu) ? true : false
}