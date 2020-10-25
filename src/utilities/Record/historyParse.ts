// import types
import { RecordItemType } from '../../types/Record'

export const historyRecordParse = (record: RecordItemType) => {
  let text: string = ''

  text += record.name + ', '
  if (record.isMuscle) {
    text += record.amounts.join('回, ') + '回, '
    text += record.weights.length ? record.weights.join('kg, ') + 'kg, ' : ''
    text += record.durations.length ? record.durations.join('秒, ') + '秒, ' : ''
  } else {
    text += record.distance && record.distance + 'km, ' + 'km, '
    text += record.time && record.time + '分, ' + '分, '
  }

  return text
}