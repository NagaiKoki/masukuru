import React, { useState } from 'react'
import styled from 'styled-components'
import ReactDatePicker from 'react-native-datepicker'

interface DatePickerProps {
  date: Date
  handleOnChange: (date: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const { date, handleOnChange } = props
  const minDate = new Date("2020/01/01")
  const maxDate = new Date()

  return (
    <ReactDatePicker 
      date={date}
      mode="date"
      placeholder="トレーニング日を選択"
      minDate={minDate}
      confirmBtnText="完了"
      cancelBtnText="閉じる"
      onDateChange={(dateStr: string, date: Date) => handleOnChange(date)}
    />
  )
}

export default DatePicker