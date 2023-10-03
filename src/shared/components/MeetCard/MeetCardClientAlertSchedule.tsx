import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex
} from '@chakra-ui/react'
import RstButton from '../Button'
import moment from 'moment'
import React from 'react'
import { iAppointment } from '@shared/interface/public'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardClientAlertSchedule = ({ isOpen, onClose, appointment }: iProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Agendar horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja agendar este horário? </Text>
            <Flex gap={2}>
              <Text>Dia:</Text>
              <Text fontWeight={600}>{moment(appointment.start).format('DD/MM/YYYY')}</Text>
            </Flex>

            <Flex gap={2}>
              <Text>Hora:</Text>
              <Text fontWeight={600}>
                {moment(appointment.start).format('hh:mm')} - {moment(appointment.start).format('hh:mm')}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end">
            <RstButton variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose}>
              Cancelar
            </RstButton>
            <RstButton>Agendar</RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardClientAlertSchedule
