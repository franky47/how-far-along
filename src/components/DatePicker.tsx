import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = FormControlProps & {
  label: string
  date?: string
  onDatePicked: (date: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  onDatePicked,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <ReactDatePicker
        placeholderText="Enter your due date"
        selected={date ? new Date(date) : undefined}
        onChange={date => {
          if (date && !Array.isArray(date) && onDatePicked) {
            onDatePicked(dayjs(date).format('YYYY-MM-DD'))
          }
        }}
        customInput={<Input />}
      />
    </FormControl>
  )
}
