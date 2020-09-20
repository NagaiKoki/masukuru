import { APPLAUSE_MESSAGE } from '../../constants/applauseMessage'

export const applauseSubText = (size: number): string | undefined => {
  if (size === 1) {
    return APPLAUSE_MESSAGE.FIRST
  } else if (size === 2) {
    return APPLAUSE_MESSAGE.SECOND
  } else if (size === 3) {
    return APPLAUSE_MESSAGE.THIRD
  } else if (size === 6) {
    return APPLAUSE_MESSAGE.SIXTH
  } else if (size === 10) {
    return APPLAUSE_MESSAGE.TENTH
  } else if (size === 15) {
    return APPLAUSE_MESSAGE.FIFTEENTH
  } else if (size === 20) {
    return APPLAUSE_MESSAGE.TWENTIETH
  } else if (size === 30) {
    return APPLAUSE_MESSAGE.THIRTIETH
  }
}