import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { FormLabel, Input } from '@chakra-ui/core'

export interface DatePickerProps extends PseudoBoxProps {
  date?: string
  onDatePicked?: (date: string) => void
  onDateCleared?: () => void
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDatePicked,
  onDateCleared,
  ...props
}) => {
  return (
    <PseudoBox {...props}>
      <FormLabel htmlFor="dueDate">Due Date</FormLabel>
      <Input
        type="date"
        name="dueDate"
        value={date}
        onChange={(e: any) => {
          if (!e.target.value) {
            if (onDateCleared) {
              onDateCleared()
            }
          } else if (onDatePicked) {
            onDatePicked(e.target.value)
          }
        }}
      />
    </PseudoBox>
  )
}
