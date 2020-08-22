// import utils
import Analytics from '../../config/amplitude'
import { convertTimestampToString } from '../timestamp'
// import types
import { RecordItemType } from '../../types/Record'

export const trackSaveRecord = (word: string, date: Date, recordLength: number) => {
  Analytics.track('saveRecord', { word: word, trainingDate: convertTimestampToString(undefined, date), records: recordLength })
}

export const trackRecordContents = (records: RecordItemType[]) => {
  records.forEach(record => {
    Analytics.track('recordContent', { name: record.name, type: record.isMuscle ? "無酸素運動" : "有酸素運動" })
  })
}

