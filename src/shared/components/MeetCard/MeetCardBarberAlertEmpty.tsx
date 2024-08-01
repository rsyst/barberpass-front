import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { iAppointment } from '@shared/interfaces'
import { usePut } from '@shared/services'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertEmpty = ({ isOpen, onClose, appointment }: iProps) => {
  console.log(appointment)
  const { mutate: emptyAppointment, isLoading } = usePut(
    ENDPOINTS.PUT_BARBER_APPOINTMENTS_BY_GROUP_INDEX_EMPTY(appointment?.groupIndex || '')
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    emptyAppointment(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_WEEK)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_DASHBOARD)
          toast({
            title: 'Agendamento cancelado com sucesso',
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
        <ModalContent mx={4} borderRadius={24}>
          <ModalHeader>Cancelar horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja cancelar este agendamento?</Text>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end" p={6}>
            <Button variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose} isLoading={isLoading}>
              Cancelar
            </Button>
            <Button colorScheme="newRed" onClick={handleSubmit} isLoading={isLoading}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertEmpty
