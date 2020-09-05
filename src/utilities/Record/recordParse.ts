import { RecordItemType } from '../../types/Record'

export const parseRecord = (record: RecordItemType): string => {
  let renderAmountText: string
  let renderWeightText: string
  let renderText: string
  if (record.recordType === 'muscle') {
    renderAmountText = record.amounts.filter(Boolean).join('回, ') + '回, '
    renderWeightText = record.weights.filter(Boolean).join('kg, ') + 'kg '
    renderText = record.name + ', ' + renderAmountText + renderWeightText
  } else if (record.recordType === 'aerobic') {
    const renderDistance = record.distance ? record.distance + 'km, ' : ''
    const renderTime = record.time ? record.time + '分 ' : ''
    renderText = record.name + ', ' + renderDistance + renderTime
  }
  return renderText
}