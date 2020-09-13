import { UserWeightType, ChartTermType } from '../../types/Chart'
// import utils
import { 
  convertTimeStampToStringOnlyMonthAndDate,
  convertTimeStampToStringOnlyDate,
  convertFirebaseTimeStamp,
  getLastWeekDay,
  getLastMonthDay,
  getLastYearDay,
  getNextWeekDay,
  getNextMonthDay,
  getNextYearDay
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

export const getLastDay = (date: Date, type: ChartTermType): Date => {
  if (type === 'week') {
    return getLastWeekDay(date)
  } else if (type === 'month') {
    return getLastMonthDay(date)
  } else if (type === 'year') {
    return getLastYearDay(date)
  }
}

export const getNextDay = (date: Date, type: ChartTermType) => {
  if (type === 'week') {
    return getNextWeekDay(date)
  } else if (type === 'month') {
    return getNextMonthDay(date)
  } else if (type === 'year') {
    return getNextYearDay(date)
  }
}