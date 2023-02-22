import { Container, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { ColorModeSwitch } from 'src/components/ColorModeSwitch'
import { DatePicker } from 'src/components/DatePicker'
import { TermProgress } from 'src/components/TermProgress'
import { useHashQuery } from 'src/hooks/useHashQuery'

const IndexPage: NextPage = () => {
  const [date, setDate] = useHashQuery('dueDate')
  const [babyName] = useHashQuery('babyName')
  const [now] = useHashQuery('now')
  const [gestationWeeks] = useHashQuery('gestationWeeks')
  return (
    <>
      <Container mt={12}>
        <Stack spacing={8}>
          <Flex as="header" alignItems="center" justifyContent="space-between">
            <Heading as="h1" size="md">
              🤰 How far along ?
            </Heading>
            <ColorModeSwitch />
          </Flex>
          {!!date && (
            <TermProgress
              dueDate={date}
              babyName={babyName ?? 'Baby'}
              refDate={now}
              gestationWeeks={parseInt(gestationWeeks ?? '41')}
            />
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
              URL, which is never sent to the server. There is actually no
              server at all for this app. It's all static HTML, CSS and
              JavaScript.
            </Text>
          )}
          <Text fontSize="xs" textAlign="center" color="gray.600">
            Made by{' '}
            <Link href="https://francoisbest.com" textDecor="underline">
              François Best
            </Link>{' '}
            with{' '}
            <Link
              href="https://github.com/franky47/how-far-along"
              textDecor="underline"
            >
              open-source
            </Link>{' '}
            software.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
