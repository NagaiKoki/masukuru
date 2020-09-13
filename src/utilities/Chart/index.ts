import { UserWeightType, ChartTermType } from '../../types/Chart'
// import utils
import { 
  convertTimeStampToStringOnlyMonthAndDate,
  convertTimeStampToStringOnlyDate,
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

  // 月や年の場合、ラベルの数が多すぎるので、期間の始まりと終わり以外は空文字にする
  if (dateArry.length >= 7 && (term === 'year' || term === 'month')) {
    const length = dateArry.length
    dateArry = []
    for (let i = 0; i < length; i++) {
      dateArry.push('')
    }
  }

  // データがない場合は、期間の始めと終わりの空データを突っ込む
  if (!weightArry.length) {
    weightArry = [0, 0]
    dateArry = [convertTimeStampToStringOnlyMonthAndDate(undefined, endDate), convertTimeStampToStringOnlyMonthAndDate(undefined, startDate)]
    datesWithYear = [convertTimeStampToStringOnlyDate(undefined, endDate), convertTimeStampToStringOnlyDate(undefined, startDate)]
  }

  // 配列が1以上 かつ 期間の始め or 終わりを持っていない場合は、それらを配列に突っ込む
  if (weightArry.length >= 1) {
    if (!dateArry.includes(convertTimeStampToStringOnlyMonthAndDate(undefined, endDate))) {
      // 年の場合は期間の文字列に年も付与する
      dateArry.unshift( term === 'year' ? convertTimeStampToStringOnlyDate(undefined, endDate) : convertTimeStampToStringOnlyMonthAndDate(undefined, endDate))
      weightArry.unshift(0)
      datesWithYear.unshift(convertTimeStampToStringOnlyDate(undefined, endDate))
    }
    if (!dateArry.includes(convertTimeStampToStringOnlyMonthAndDate(undefined, startDate))) {
      dateArry.push(term === 'year' ? convertTimeStampToStringOnlyDate(undefined, startDate) : convertTimeStampToStringOnlyMonthAndDate(undefined, startDate))
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