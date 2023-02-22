import {
  Progress,
  Stack,
  StackProps,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'

dayjs.extend(relativeTime)
dayjs.extend(duration)

type TermProgressProps = StackProps & {
  babyName: string
  dueDate: string
  refDate: string | null
  gestationWeeks: number
}

export const TermProgress: React.FC<TermProgressProps> = ({
  babyName,
  dueDate,
  refDate,
  gestationWeeks,
  ...props
}) => {
  const now = dayjs(refDate ?? undefined)
  const due = dayjs(dueDate)
  const remaining = dayjs.duration(due.diff(now))
  const elapsed = dayjs.duration(now.diff(due.subtract(gestationWeeks, 'week')))
  const progress =
    (100 * elapsed.asMilliseconds()) /
    dayjs.duration(gestationWeeks, 'week').asMilliseconds()

  return (
    <Stack {...props} spacing={8}>
      <StatGroup
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-start']}
      >
        <Stat textAlign="center" mb={[4, 0]}>
          <StatLabel>Week</StatLabel>
          <StatNumber fontSize="5xl">
            {Math.floor(elapsed.asWeeks())}
          </StatNumber>
        </Stat>
        <Stat textAlign="center" mb={[4, 0]}>
          <StatLabel>Day</StatLabel>
          <StatNumber fontSize="5xl">
            {Math.round(
              elapsed.subtract(Math.floor(elapsed.asWeeks()), 'week').asDays()
            )}
          </StatNumber>
        </Stat>
        <Stat textAlign="center">
          <StatLabel>{babyName} is due in</StatLabel>
          <StatNumber fontSize="5xl">
            {Math.ceil(remaining.asDays())}
          </StatNumber>
          <StatHelpText>days</StatHelpText>
        </Stat>
      </StatGroup>
      <Stack isInline alignItems="center">
        <Progress value={progress} hasStripe rounded="sm" size="lg" flex={1} />
        <Text fontSize="xs" textAlign="center">
          {progress.toFixed()}%
        </Text>
      </Stack>
    </Stack>
  )
}
