import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { StackContainer, OutgoingLink, StackCard } from '@47ng/chakra-next'
import { Heading, Text } from '@chakra-ui/core'
import { useHashQuery } from 'src/hooks/useHashQuery'
import { DatePicker } from 'src/components/DatePicker'
import { TermProgress } from 'src/components/TermProgress'
import { DefaultSeo } from 'next-seo'
import defaultSeoConfig from 'src/seo.json'

const IndexPage: NextPage = () => {
  const [date, setDate] = useHashQuery('dueDate')
  const [babyName] = useHashQuery('babyName')
  const [now] = useHashQuery('now')
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤰</text></svg>"
        />
      </Head>
      <DefaultSeo
        {...defaultSeoConfig}
        canonical={process.env.DEPLOYMENT_URL ?? 'http://localhost'}
      />
      <StackContainer mt={12} spacing={8}>
        {!!date && (
          <StackCard>
            <TermProgress
              dueDate={date}
              babyName={babyName ?? 'Baby'}
              refDate={now}
            />
          </StackCard>
        )}
        {!date && (
          <Heading as="h1" size="md">
            🤰 How far along ?
          </Heading>
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
            URL, which is never sent to the server. There is actually no server
            at all for this app. It's all static HTML, CSS and JavaScript.
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
    </>
  )
}

export default IndexPage
