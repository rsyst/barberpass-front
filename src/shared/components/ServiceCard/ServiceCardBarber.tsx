import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iStatus } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstFormScheduleMeet from '../FormScheduleMeet'

export interface iRstServiceCardBarber {
  start: string
  end: string
  status: iStatus
  service: {
    name: string
  }
}

const statusColor = {
  CONFIRMED: 'green',
  BREAK: 'red',
  OCCUPIED: 'yellow',
  EMPTY: 'gray'
}

export const RstServiceCardBarber = ({ start, end, service, status }: iRstServiceCardBarber) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const options = [
    {
      label: 'Editar',
      value: 'EDIT',
      onClick: onOpen
    },
    {
      label: 'Cancelar',
      value: 'CANCEL',
      onClick: onOpen
    }
  ]

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" p={6} bg="gray.200" borderRadius={16} shadow="md">
        <Flex flexDir="column">
          <Text fontWeight="600">Corte de cabelo</Text>
          <Text fontSize={14}>R$25,00</Text>
          <Text fontSize={14}>2 horarios</Text>
        </Flex>

        <Flex>
          <IconButton aria-label="menu" />
        </Flex>
      </Flex>
    </>
  )
}
