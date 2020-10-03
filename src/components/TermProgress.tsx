import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import Text from '@chakra-ui/core/dist/Text'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import {
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup
} from '@chakra-ui/core'

dayjs.extend(relativeTime)
dayjs.extend(duration)

export interface TermProgressProps extends StackProps {
  dueDate: string
}

export const TermProgress: React.FC<TermProgressProps> = ({
  dueDate,
  ...props
}) => {
  const now = dayjs()
  const due = dayjs(dueDate)
  const remaining = dayjs.duration(due.diff(now))
  const elapsed = dayjs.duration(now.diff(due.subtract(41, 'week')))
  const progress =
    (100 * elapsed.asMilliseconds()) /
    dayjs.duration(41, 'week').asMilliseconds()

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
        <Stat textAlign="center">
          <StatLabel>Baby is due in</StatLabel>
          <StatNumber fontSize="5xl">
            {Math.round(remaining.asDays())}
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
