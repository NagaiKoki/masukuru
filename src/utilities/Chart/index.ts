import { UserWeightType } from '../../types/Chart'
// import utils
import { 
  convertTimeStampToStringOnlyMonthAndDate,
  convertTimeStampToStringOnlyDate,
  convertFirebaseTimeStamp
 } from '../../utilities/timestamp'

export const getRequireWeightData = (weights: UserWeightType[]): { weightArry: number[], dateArry: string[], datesWithYear: string[] } => {
  let weightArry: number[] = []
  let dateArry: string[] = []
  let datesWithYear: string[] = []

  weights.forEach(weight => {
    weightArry.push(Number(weight.weight))
    dateArry.push(convertTimeStampToStringOnlyMonthAndDate(weight.date))
    datesWithYear.push(convertTimeStampToStringOnlyDate(weight.date))
  })

  if (!weightArry.length) {
    weightArry.push(0)
    dateArry.push(convertTimeStampToStringOnlyMonthAndDate(convertFirebaseTimeStamp(new Date)))
    datesWithYear.push(convertTimeStampToStringOnlyDate(convertFirebaseTimeStamp(new Date)))
  }

  return { weightArry: weightArry, dateArry: dateArry, datesWithYear: datesWithYear }
}