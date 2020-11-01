import { COLORS } from '../constants/Styles'

export const navigatorOptions = (title: string, options?: Object): Object => {
  return {
    headerBackTitleVisible: false,
    headerTitle: title,
    headerStyle: {
      backgroundColor: COLORS.BASE_MUSCLEW
    },
    headerTintColor: COLORS.BASE_WHITE,
    ...options
  }
}