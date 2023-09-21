import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iAppointment, iService, iStatus } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstMeetCardClientAlertSchedule from './MeetCardClientAlertSchedule'
import moment from 'moment'

export interface iRstMeetCardClient extends iAppointment {
  status: iStatus
  service: iService
}

const statusColor = {
  CONFIRMED: 'green',
  BREAK: 'red',
  OCCUPIED: 'yellow',
  EMPTY: 'gray'
}

export const RstMeetCardClient = ({ ...appointment }: iRstMeetCardClient) => {
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
    BREAK: [],
    OCCUPIED: [
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
    EMPTY: [
      {
        label: 'Agendar',
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
      <Flex p={4} bg="gray.100" shadow="md" borderRadius={16} gap={4} justifyContent="space-between" minW={150} m={2}>
        <Flex gap={4}>
          <Flex flexDir="column">
            <Text fontSize={18} fontWeight={600} color="black">
              {moment(appointment.start).format('hh:mm')}
            </Text>
            <Text fontSize={12} color="gray.1200">
              {moment(appointment.end).format('hh:mm')}
            </Text>
          </Flex>
          <Flex flexDir="column">
            <Text color="gray.1200" fontWeight={500}>
              {appointment?.service?.name}
            </Text>

            <RstBadge
              colorScheme={statusColor[appointment.status.key]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {appointment.status.pt}
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
              {optionsByStatus[appointment.status.key].map((option, index) => (
                <MenuItem key={index} onClick={option.onClick}>
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <RstMeetCardClientAlertSchedule isOpen={isOpen} onClose={onClose} appointment={appointment} />
    </>
  )
}
