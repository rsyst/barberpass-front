import { Flex, FlexProps, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import RstText from '../Text'
import MeetCardSchedule from './MeetCardSchedule'

export interface iRstMeetCard {
  start: string
  end: string
  status: { pt: string; key: 'CONFIRMED' | 'CANCELED' | 'WAITING_CONFIRMATION' | 'EMPTY' | 'BREAK_TIME' }
  service: {
    name: string
  }
  id: string
}

const RstMeetCard = ({ start, end, service, status, id }: iRstMeetCard) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const defaultStyle: FlexProps = {
    flexDir: 'column',
    p: 4,
    bg: 'gray.100',
    borderRadius: 16,
    gap: 2,
    minW: 170,
    _hover: {
      bg: 'gray.300'
    },
    cursor: 'pointer',
    onClick: onOpen
  }
  const item = { start, end, service, status, id }

  const MeetWithStatus = () => {
    switch (status.key) {
      case 'CONFIRMED':
        return (
          <Flex {...defaultStyle}>
            <RstText fontVariant="h4" color="gray.1200">
              {start} - {end}
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              {service?.name}
            </RstText>
            <RstBadge colorScheme="green" size="sm">
              {status.pt}
            </RstBadge>
          </Flex>
        )
      case 'CANCELED':
        return (
          <Flex {...defaultStyle}>
            <RstText fontVariant="h4" color="gray.1200">
              {start} - {end}
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              {service?.name}
            </RstText>
            <RstBadge colorScheme="red" size="sm">
              {status.pt}
            </RstBadge>
          </Flex>
        )
      case 'WAITING_CONFIRMATION':
        return (
          <Flex {...defaultStyle}>
            <RstText fontVariant="h4" color="gray.1200">
              {start} - {end}
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              {service?.name}
            </RstText>
            <RstBadge colorScheme="yellow" size="sm">
              {status.pt}
            </RstBadge>
          </Flex>
        )
      case 'EMPTY':
        return (
          <Flex {...defaultStyle} borderColor="gray.800" borderWidth={3}>
            <RstText fontVariant="h4" color="gray.1200">
              {start} - {end}
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              + Adicionar
            </RstText>
            <RstBadge colorScheme="gray" size="sm">
              {status.pt}
            </RstBadge>
          </Flex>
        )
      case 'BREAK_TIME':
        return (
          <Flex {...defaultStyle} borderColor="blue.800" borderWidth={3}>
            <RstText fontVariant="h4" color="blue.1200">
              {start} - {end}
            </RstText>
            <RstText fontVariant="body1" color="blue.1100">
              Ocupado
            </RstText>
            <RstBadge colorScheme="blue" size="sm">
              {status.pt}
            </RstBadge>
          </Flex>
        )
    }
  }
  return (
    <>
      <MeetWithStatus />
      <MeetCardSchedule isOpen={isOpen} onClose={onClose} item={item} />
    </>
  )
}

export default RstMeetCard
