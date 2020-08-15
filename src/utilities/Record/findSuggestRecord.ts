// import constants
import { TRAINING_NAMES } from '../../constants/trainingNames'

export const findSuggestRecordByKeyword = (keyword: string) => {
  const recordNames = TRAINING_NAMES.filter(name => name.indexOf(keyword) > -1)
  return recordNames
}