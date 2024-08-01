import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { iBarber, iService } from '@shared/interfaces/public'
import { currencyMask } from '@shared/utils/currencyMask'
import RstServiceCardClientModalAppointments from './ServiceCardClientModalAppointments'

export interface iRstServiceCardClient {
  service: iService
  barber: iBarber
}

export const RstServiceCardClient = ({ service, barber }: iRstServiceCardClient) => {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p={6}
        bg="gray.200"
        borderRadius={16}
        shadow="md"
        onClick={onOpenEdit}
      >
        <Flex flexDir="column">
          <Text fontWeight="600">{service.name}</Text>
          <Text fontSize={14}>{currencyMask(String(service.price * 100))}</Text>
          <Text fontSize={14}>{service.workAmount} horário(s)</Text>
        </Flex>
      </Flex>

      {isOpenEdit && (
        <RstServiceCardClientModalAppointments
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          service={service}
          barber={barber}
        />
      )}
    </>
  )
}
