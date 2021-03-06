import { RecordItemType } from '../../types/Record'

export const parseRecord = (record: RecordItemType): string => {
  let renderAmountText: string
  let renderWeightText: string
  let renderDurationText: string
  let renderText: string
  if (record.isMuscle) {
    renderAmountText = record.amounts.filter(Boolean).join('回, ') + '回, '
    renderWeightText = record.weights.filter(Boolean).join('kg, ') + 'kg, ',
    renderDurationText = record.durations.filter(Boolean).join('秒, ') + '秒 '
    renderText = record.name + ', ' + renderAmountText + renderWeightText + renderDurationText
  } else {
    const renderDistance = record.distance ? record.distance + 'km, ' : ''
    const renderTime = record.time ? record.time + '分 ' : ''
    renderText = record.name + ', ' + renderDistance + renderTime
  }
  return renderText
}