import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast
} from '@chakra-ui/react'
import RstButton from '../Button'
import React from 'react'
import { iAppointment } from '@shared/interface/public'
import { usePatch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertConfirmed = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: confirmedAppointment } = usePatch(
    ENDPOINTS.PATCH_BARBER_APPOINTMENTS_BY_ID_CONFIRMED(appointment?.id || '')
  )
  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    confirmedAppointment(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS)
          toast({
            title: 'Agendamento confirmado com sucesso',
            status: 'success',
            isClosable: true
          })
          onClose()
        }
      }
    )
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4}>
          <ModalHeader>Agendar horario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja confirmar este agendamento?</Text>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end">
            <RstButton variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose}>
              Cancelar
            </RstButton>
            <RstButton colorScheme="blue" onClick={handleSubmit}>
              Confirmar
            </RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertConfirmed
