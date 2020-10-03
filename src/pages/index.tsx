import React from 'react'
import { NextPage } from 'next'
import { Container, StackCard } from '@47ng/chakra-next'
import { useHashQuery } from 'src/hooks/useHashQuery'
import { DatePicker } from 'src/components/DatePicker'
import { TermProgress } from 'src/components/TermProgress'

const IndexPage: NextPage = () => {
  const [date, setDate] = useHashQuery('dueDate')
  return (
    <Container mt={12}>
      {!!date && (
        <StackCard>
          <TermProgress dueDate={date} />
        </StackCard>
      )}
      {!date && (
        <DatePicker
          date={date ?? undefined}
          onDatePicked={date => setDate(date)}
        />
      )}
    </Container>
  )
}

export default IndexPage
