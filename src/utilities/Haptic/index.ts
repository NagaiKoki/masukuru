import * as Haptics from 'expo-haptics';

export const hapticFeedBack = (type: 'light' | 'medium' | 'heavy') => {
  switch(type) {
    case 'light': {
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    case 'medium': {
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    case 'heavy': {
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
  }
}