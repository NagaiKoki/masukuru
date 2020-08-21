import React, { useState } from 'react'
import styled from 'styled-components'
import ReactDatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome'
// import constants
import { COLORS } from '../../constants/Styles'

interface DatePickerProps {
  date: Date
  handleOnChange: (date: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const { date, handleOnChange } = props
  const minDate = new Date("2020/01/01")
  const dt = new Date()
  const maxDate = new Date(dt.setFullYear(dt.getFullYear() + 10))

  return (
    <ReactDatePicker 
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
      onDateChange={(dateStr: string, date: Date) => handleOnChange(date)}
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