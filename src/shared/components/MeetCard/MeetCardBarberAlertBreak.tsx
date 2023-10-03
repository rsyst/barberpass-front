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

export const RstMeetCardBarberAlertBreak = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: breakAppointment, isLoading } = usePatch(
    ENDPOINTS.PATCH_BARBER_APPOINTMENTS_BY_ID_BREAK(appointment?.id || '')
  )
  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    breakAppointment(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_WEEK)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_DASHBOARD)
          toast({
            title: 'Intervalo agendado com sucesso',
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
          <ModalHeader>Agendar intervalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Você tem certeza que deseja agendar este horário como seu <b>Intervalo</b>?
            </Text>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end">
            <RstButton variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose} isLoading={isLoading}>
              Cancelar
            </RstButton>
            <RstButton onClick={handleSubmit} isLoading={isLoading}>
              Confirmar
            </RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertBreak
