import { parseISO, format } from 'date-fns'
import { Box, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  dateString: string
}

const DateFormatter = ({ dateString, ...props }: Props) => {
  const date = parseISO(dateString)
  return (
    <Box as="time" dateTime={dateString} {...props}>
      {format(date, 'LLLL	d, yyyy')}
    </Box>
  )
}

export default DateFormatter
