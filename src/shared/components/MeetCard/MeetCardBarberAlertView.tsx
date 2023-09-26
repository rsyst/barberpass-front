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
import React from 'react'
import { iAppointment } from '@shared/interface/public'
import moment from 'moment'
import { phoneMask } from '@shared/utils/phoneMask'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertView = ({ isOpen, onClose, appointment }: iProps) => {
  const handleSubmit = () => {
    onClose()
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4}>
          <ModalHeader>Agendamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Informações sobre seu agendamento </Text>
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

            <Flex gap={2}>
              <Text>Cliente:</Text>
              <Text fontWeight={600}>{appointment.name}</Text>
            </Flex>

            <Flex gap={2}>
              <Text>Telefone:</Text>
              <Text fontWeight={600}>{phoneMask(appointment.phoneNumber)}</Text>
            </Flex>

            <Flex gap={2}>
              <Text>Serviço:</Text>
              <Text fontWeight={600}>{appointment.service?.name}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end">
            <RstButton colorScheme="blue" onClick={handleSubmit}>
              Fechar
            </RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertView
