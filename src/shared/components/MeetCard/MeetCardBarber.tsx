import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iAppointment } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstFormScheduleMeet from '../FormScheduleMeet'
import moment from 'moment'
import RstMeetCardBarberAlertBreak from './MeetCardBarberAlertBreak'
import RstMeetCardBarberAlertConfirmed from './MeetCardBarberAlertConfirmed'
import RstMeetCardBarberAlertEmpty from './MeetCardBarberAlertEmpty'
import RstMeetCardBarberAlertView from './MeetCardBarberAlertView'

export type iRstMeetCardBarber = iAppointment

const statusColor = {
  CONFIRMED: 'newGreen',
  BREAK: 'newRed',
  OCCUPIED: 'newYellow',
  EMPTY: 'gray'
}

export const RstMeetCardBarber = ({ ...appointment }: iRstMeetCardBarber) => {
  const { isOpen: isOpenOccupied, onOpen: onOpenOccupied, onClose: onCloseOccupied } = useDisclosure()
  const { isOpen: isOpenEmpty, onOpen: onOpenEmpty, onClose: onCloseEmpty } = useDisclosure()
  const { isOpen: isOpenConfirmed, onOpen: onOpenConfirmed, onClose: onCloseConfirmed } = useDisclosure()
  const { isOpen: isOpenBreak, onOpen: onOpenBreak, onClose: onCloseBreak } = useDisclosure()
  const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure()

  const optionsByStatus = {
    CONFIRMED: [
      {
        label: 'Visualizar',
        onClick: onOpenView
      },
      {
        label: 'Cancelar',
        onClick: onOpenEmpty
      }
    ],
    BREAK: [
      {
        label: 'Cancelar',
        onClick: onOpenEmpty
      }
    ],
    OCCUPIED: [
      {
        label: 'Visualizar',
        onClick: onOpenView
      },
      {
        label: 'Confirmar',
        onClick: onOpenConfirmed
      },
      {
        label: 'Cancelar',
        onClick: onOpenEmpty
      }
    ],
    EMPTY: [
      {
        label: 'Agendar',
        onClick: onOpenOccupied
      },
      {
        label: 'Visualizar',
        onClick: onOpenView
      },
      {
        label: 'Intervalo',
        onClick: onOpenBreak
      },
      {
        label: 'Cancelar',
        onClick: onOpenEmpty
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
              {appointment.name}
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
        <RstFormScheduleMeet isOpen={isOpenOccupied} onClose={onCloseOccupied} appointment={appointment} />
      )}
      {isOpenBreak && (
        <RstMeetCardBarberAlertBreak isOpen={isOpenBreak} onClose={onCloseBreak} appointment={appointment} />
      )}
      {isOpenConfirmed && (
        <RstMeetCardBarberAlertConfirmed
          isOpen={isOpenConfirmed}
          onClose={onCloseConfirmed}
          appointment={appointment}
        />
      )}
      {isOpenEmpty && (
        <RstMeetCardBarberAlertEmpty isOpen={isOpenEmpty} onClose={onCloseEmpty} appointment={appointment} />
      )}
      {isOpenView && <RstMeetCardBarberAlertView isOpen={isOpenView} onClose={onCloseView} appointment={appointment} />}
    </>
  )
}
