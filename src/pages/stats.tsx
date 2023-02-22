import { Container, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { ColorModeSwitch } from 'src/components/ColorModeSwitch'
import { TermProgress } from 'src/components/TermProgress'
import { useHashQuery } from 'src/hooks/useHashQuery'

const StatsPage: NextPage = () => {
  const [date] = useHashQuery('dueDate')
  const [babyName] = useHashQuery('babyName')
  const [now] = useHashQuery('now')
  const [gestationWeeks] = useHashQuery('gestationWeeks')

  if (!date) {
    return (
      <Container mt={12}>
        <Text>Missing date</Text>
        <Link href="/">Go back</Link>
      </Container>
    )
  }
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
          <TermProgress
            dueDate={date}
            babyName={babyName ?? 'Baby'}
            refDate={now}
            gestationWeeks={parseInt(gestationWeeks ?? '41')}
          />
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

export default StatsPage
