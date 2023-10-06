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
import { usePut } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardClientAlertEmpty = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: emptyAppointment, isLoading } = usePut(
    ENDPOINTS.PUT_CLIENT_APPOINTMENTS_BY_GROUP_INDEX_EMPTY(appointment?.groupIndex || '')
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    emptyAppointment(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_CLIENT_APPOINTMENTS)
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
        <ModalContent mx={4}>
          <ModalHeader>Cancelar horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja cancelar este agendamento?</Text>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end">
            <RstButton variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose} isLoading={isLoading}>
              Cancelar
            </RstButton>
            <RstButton colorScheme="newRed" onClick={handleSubmit} isLoading={isLoading}>
              Confirmar
            </RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardClientAlertEmpty
