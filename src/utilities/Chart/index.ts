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

export const getRequireWeightData = (weights: UserWeightType[], startDate: Date, term: ChartTermType): { weightArry: number[], dateArry: string[], datesWithYear: string[] } => {
  let weightArry: number[] = []
  let dateArry: string[] = []
  let datesWithYear: string[] = []
  const endDate = getLastDay(startDate, term)

  weights.forEach(weight => {
    weightArry.push(Number(weight.weight))
    dateArry.push(convertTimeStampToStringOnlyMonthAndDate(weight.date))
    datesWithYear.push(convertTimeStampToStringOnlyDate(weight.date))
  })

  // データがない場合は、期間の始めと終わりの空データを突っ込む
  if (!weightArry.length) {
    weightArry = [0, 0]
    dateArry = [convertTimeStampToStringOnlyMonthAndDate(undefined, endDate), convertTimeStampToStringOnlyMonthAndDate(undefined, startDate)]
    datesWithYear = [convertTimeStampToStringOnlyDate(undefined, endDate), convertTimeStampToStringOnlyDate(undefined, startDate)]
  }

  // 配列が1以上で、期間の始め or 終わりを持っていない場合は、配列に突っ込む
  if (weightArry.length >= 1) {
    if (!dateArry.includes(convertTimeStampToStringOnlyMonthAndDate(undefined, endDate))) {
      dateArry.unshift(convertTimeStampToStringOnlyMonthAndDate(undefined, endDate))
      weightArry.unshift(0)
      datesWithYear.unshift(convertTimeStampToStringOnlyDate(undefined, endDate))
    }
    if (!dateArry.includes(convertTimeStampToStringOnlyMonthAndDate(undefined, startDate))) {
      dateArry.push(convertTimeStampToStringOnlyMonthAndDate(undefined, startDate))
      weightArry.push(0)
      datesWithYear.push(convertTimeStampToStringOnlyDate(undefined, startDate))
    }
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