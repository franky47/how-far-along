import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ColorModeSwitch } from 'src/components/ColorModeSwitch'
import { DatePicker } from 'src/components/DatePicker'

type FormValues = {
  dueDate: string
  gestationWeeks: number
  babyName: string
}

const initialValues: FormValues = {
  dueDate: '',
  gestationWeeks: 41,
  babyName: ''
}

const IndexPage: NextPage = () => {
  const { register, watch, setValue, handleSubmit, formState } = useForm({
    defaultValues: initialValues
  })
  const router = useRouter()
  const onSubmit = React.useCallback(
    (values: FormValues) => {
      const hash = new URLSearchParams()
      for (const [key, value] of Object.entries(values)) {
        hash.set(key, value.toString())
      }
      return router.push({
        pathname: '/stats',
        hash: hash.toString()
      })
    },
    [router]
  )
  return (
    <>
      <Container mt={12}>
        <Flex
          as="header"
          alignItems="center"
          justifyContent="space-between"
          mb={12}
        >
          <Heading as="h1" size="md">
            🤰 How far along ?
          </Heading>
          <ColorModeSwitch />
        </Flex>
        <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
          <DatePicker
            date={watch('dueDate')}
            onDatePicked={date => setValue('dueDate', date)}
            isRequired
          />
          <FormControl>
            <FormLabel>Weeks of gestation</FormLabel>
            <Select {...register('gestationWeeks')}>
              <option value={40}>40</option>
              <option value={41}>41</option>
            </Select>
            <FormHelperText>
              40 weeks in the UK, 41 weeks in France
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Baby name</FormLabel>
            <Input {...register('babyName')} />
          </FormControl>
          <Text fontSize="sm" fontStyle="italic" color="gray.500">
            Privacy Policy: your due date is stored in the hash portion of the
            URL, which is never sent to the server. There is actually no server
            at all for this app. It's all static HTML, CSS and JavaScript.
          </Text>
          <Button
            type="submit"
            isLoading={formState.isSubmitting}
            colorScheme="green"
          >
            How far along?
          </Button>
        </Stack>
        <Text fontSize="xs" textAlign="center" color="gray.500" mt={12}>
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
      </Container>
    </>
  )
}

export default IndexPage
