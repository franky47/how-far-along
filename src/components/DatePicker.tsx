import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { FormLabel, Input } from '@chakra-ui/core'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'

export interface DatePickerProps extends PseudoBoxProps {
  date?: string
  onDatePicked: (date: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDatePicked,
  ...props
}) => {
  return (
    <PseudoBox {...props}>
      <FormLabel htmlFor="dueDate" color="gray.800">
        Due Date:
      </FormLabel>
      <ReactDatePicker
        selected={date ? new Date(date) : undefined}
        onChange={date => {
          if (date && !Array.isArray(date) && onDatePicked) {
            onDatePicked(dayjs(date).format('YYYY-MM-DD'))
          }
        }}
        customInput={<Input />}
      />
    </PseudoBox>
  )
}
