import React from 'react'
import { useDispatch } from 'react-redux'
import ReactDatePicker from 'react-native-datepicker'
// import slice
import { onChangeRecordDate } from '../../slice/record'
// import constants
import { COLORS } from '../../constants/Styles'

interface DatePickerProps {
  date: Date
}

const DatePicker = (props: DatePickerProps) => {
  const { date } = props
  const dispatch = useDispatch()
  const minDate = new Date("2020/01/01")
  const dt = new Date()
  const maxDate = new Date(dt.setFullYear(dt.getFullYear() + 10))

  const handleOnChangeDate = (date: Date) => {
    dispatch(onChangeRecordDate(date))
  }

  return (
    <ReactDatePicker 
      locale="ja"
      style={DatePickerStyle}
      date={date}
      mode="date"
      placeholder="トレーニング日を選択"
      format="YYYY/MM/DD"
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText="完了"
      cancelBtnText="閉じる"
      showIcon={false}
      onDateChange={(dateStr: string, date: Date) => handleOnChangeDate(date)}
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: -100,
        },
        dateInput: {
          borderColor: "transparent",
          borderBottomColor: COLORS.BASE_BORDER_COLOR,
          padding: 0,
        }
      }}
    />
  )
}

export default DatePicker

const DatePickerStyle = {
  borderRadius: 10,
  width: "30%",
}