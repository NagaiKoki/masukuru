import React, { useState } from 'react'
import styled from 'styled-components'
import ReactDatePicker from 'react-native-datepicker'
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
    />
  )
}

export default DatePicker

const DatePickerStyle = {
  borderColor: COLORS.BASE_BLACK,
  borderRadius: 10,
  width: "35%",
  textAlign: 'left'
}