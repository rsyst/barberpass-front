import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iStatus } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstFormScheduleMeet from '../FormScheduleMeet'

export interface iRstMeetCard {
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

const RstMeetCard = ({ start, end, service, status }: iRstMeetCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const optionsByStatus = {
    CONFIRMED: [
      {
        label: 'Visualizar',
        value: 'CANCEL',
        onClick: onOpen
      },
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpen
      }
    ],
    BREAK: [
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpen
      }
    ],
    OCCUPIED: [
      {
        label: 'Visualizar',
        value: 'CANCEL',
        onClick: onOpen
      },
      {
        label: 'Confirmar',
        value: 'CANCEL',
        onClick: onOpen
      },
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpen
      }
    ],
    EMPTY: [
      {
        label: 'Agendar',
        value: 'CANCEL',
        onClick: onOpen
      },
      {
        label: 'Visualizar',
        value: 'CANCEL',
        onClick: onOpen
      },
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpen
      }
    ]
  }

  return (
    <>
      <Flex p={4} bg="gray.100" shadow="md" borderRadius={16} gap={4} justifyContent="space-between" minW={150} mx={2}>
        <Flex gap={4}>
          <Flex flexDir="column">
            <Text fontSize={18} fontWeight={600} color="black">
              {start}
            </Text>
            <Text fontSize={12} color="gray.1200">
              {end}
            </Text>
          </Flex>
          <Flex flexDir="column">
            <Text color="gray.1200" fontWeight={500}>
              {service?.name}
            </Text>

            <RstBadge colorScheme={statusColor[status.key]} display="flex" alignItems="center" justifyContent="center">
              {status.pt}
            </RstBadge>
          </Flex>
        </Flex>
        <Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiMoreVertical />}
              variant="ghost"
              color="black"
              colorScheme="gray"
            />
            <MenuList>
              {optionsByStatus[status.key].map((option, index) => (
                <MenuItem key={index} onClick={option.onClick}>
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <RstFormScheduleMeet isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default RstMeetCard
