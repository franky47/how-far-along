import React from 'react'
import { NextPage } from 'next'
import { StackContainer, OutgoingLink, StackCard } from '@47ng/chakra-next'
import { Stack, Text } from '@chakra-ui/core'
import { useHashQuery } from 'src/hooks/useHashQuery'
import { DatePicker } from 'src/components/DatePicker'
import { TermProgress } from 'src/components/TermProgress'

const IndexPage: NextPage = () => {
  const [date, setDate] = useHashQuery('dueDate')
  return (
    <StackContainer mt={12} spacing={8}>
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
      {!date && (
        <Text fontSize="sm" fontStyle="italic">
          Privacy Policy: your due date is stored in the hash portion of the
          URL, which is never sent to the server. There is actually no server at
          all for this app. It's all static HTML, CSS and JavaScript.
        </Text>
      )}
      <Text fontSize="xs" textAlign="center" color="gray.600">
        Made by{' '}
        <OutgoingLink href="https://francoisbest.com" textDecor="underline">
          François Best
        </OutgoingLink>{' '}
        with{' '}
        <OutgoingLink
          href="https://github.com/franky47/how-far-along"
          textDecor="underline"
        >
          open-source
        </OutgoingLink>{' '}
        software.
      </Text>
    </StackContainer>
  )
}

export default IndexPage
