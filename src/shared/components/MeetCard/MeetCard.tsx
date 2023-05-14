import { Flex } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import RstText from '../Text'

interface iRstMeetCard {
  start: string
  end: string
  status: { pt: string }
  // status: 'CONFIRMED' | 'CANCELED' | 'WAITING_CONFIRMATION' | 'EMPTY' | 'BREAK_TIME'
  service: {
    name: string
  }
}

const RstMeetCard = ({ start, end, service, status }: iRstMeetCard) => {
  return (
    <Flex flexDir="column" p={4} bg="gray.100" borderRadius={16} gap={2} minW={150}>
      <RstText fontVariant="h5" color="gray.1200">
        {start} - {end}
      </RstText>
      <RstText fontVariant="secondary2" color="gray.1100">
        {service?.name}
      </RstText>
      <RstBadge colorScheme="green">{status.pt}</RstBadge>
    </Flex>
  )
}

export default RstMeetCard
