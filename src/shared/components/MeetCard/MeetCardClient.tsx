import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { RstBadge } from '@shared/components'
import { iAppointment, iStatus } from '@shared/interfaces/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstMeetCardClientAlertSchedule from './MeetCardClientAlertSchedule'
import moment from 'moment'
import RstMeetCardClientAlertEmpty from './MeetCardClientAlertEmpty'
import RstMeetCardClientAlertView from './MeetCardClientAlertView'

export interface iRstMeetCardClient extends iAppointment {
  status?: iStatus
}

const statusColor = {
  CONFIRMED: 'newGreen',
  BREAK: 'newRed',
  OCCUPIED: 'newYellow',
  EMPTY: 'gray'
}

export const RstMeetCardClient = ({ ...appointment }: iRstMeetCardClient) => {
  const { isOpen: isOpenOccupied, onOpen: onOpenOccupied, onClose: onCloseOccupied } = useDisclosure()
  const { isOpen: isOpenEmpty, onOpen: onOpenEmpty, onClose: onCloseEmpty } = useDisclosure()
  const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure()

  const optionsByStatus = {
    CONFIRMED: [
      {
        label: 'Visualizar',
        value: 'VIEW',
        onClick: onOpenView
      },
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpenEmpty
      }
    ],
    BREAK: [],
    OCCUPIED: [
      {
        label: 'Visualizar',
        value: 'VIEW',
        onClick: onOpenView
      },
      {
        label: 'Cancelar',
        value: 'CANCEL',
        onClick: onOpenEmpty
      }
    ],
    EMPTY: [
      {
        label: 'Agendar',
        value: 'SCHEDULE',
        onClick: onOpenOccupied
      }
    ]
  }

  return (
    <>
      <Flex p={4} bg="gray.100" shadow="md" borderRadius={16} gap={4} justifyContent="space-between" minW={150} m={2}>
        <Flex gap={4}>
          <Flex flexDir="column">
            <Text fontSize={18} fontWeight={600} color="black">
              {moment(appointment.start).format('HH:mm')}
            </Text>
            <Text fontSize={12} color="gray.1200">
              {moment(appointment.end).format('HH:mm')}
            </Text>
          </Flex>
          <Flex flexDir="column">
            <Text color="gray.1200" fontWeight={500}>
              {appointment?.service.name}
            </Text>

            <RstBadge
              colorScheme={statusColor[appointment.status?.key || 'EMPTY']}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {appointment.status?.pt}
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
              {optionsByStatus[appointment.status?.key || 'EMPTY'].map((option, index) => (
                <MenuItem key={index} onClick={option.onClick}>
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {isOpenOccupied && (
        <RstMeetCardClientAlertSchedule isOpen={isOpenOccupied} onClose={onCloseOccupied} appointment={appointment} />
      )}
      {isOpenEmpty && (
        <RstMeetCardClientAlertEmpty isOpen={isOpenEmpty} onClose={onCloseEmpty} appointment={appointment} />
      )}
      {isOpenView && <RstMeetCardClientAlertView isOpen={isOpenView} onClose={onCloseView} appointment={appointment} />}
    </>
  )
}
