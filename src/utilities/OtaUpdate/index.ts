import * as Updates from 'expo-updates';

export const updateModule = async () => {
  if (!__DEV__) {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        return;
      }
    } catch (e) {
      console.log(e)
    }
  }
}