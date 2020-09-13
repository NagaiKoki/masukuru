import React from 'react'
import ReactDatePicker from 'react-native-datepicker'
// import constants
import { COLORS } from '../../constants/Styles'

interface DatePickerProps {
  date: Date
  border?: boolean
  handleOnChangeDate: (date: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const { date, border, handleOnChangeDate } = props
  const minDate = new Date("2010/01/01")
  const dt = new Date()
  const maxDate = new Date(dt.setFullYear(dt.getFullYear()))

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
          borderBottomColor: border ? "transparent" : COLORS.BASE_BORDER_COLOR,
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