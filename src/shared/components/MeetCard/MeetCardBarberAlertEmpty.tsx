import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'
import { iAppointment } from '@shared/interfaces'
import {
  queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey,
  queryGetAllAuthenticatedBarberAppointmentsKey,
  queryGetAllAuthenticatedBarberMonthAppointmentsKey,
  queryGetAllAuthenticatedBarberTodayAppointmentsKey,
  queryGetAllAuthenticatedBarberWeekAppointmentsKey,
  queryGetAuthenticatedBarberDashboardKey,
  useMutationBarberUnscheduleAnAppointment
} from '@shared/services'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertEmpty = ({ isOpen, onClose, appointment }: iProps) => {
  console.log(appointment)
  const { mutate: emptyAppointment, isPending: isLoading } = useMutationBarberUnscheduleAnAppointment({
    groupIndex: appointment.groupIndex!
  })

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    emptyAppointment(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryGetAuthenticatedBarberDashboardKey] })
        queryClient.invalidateQueries({ queryKey: [queryGetAllAuthenticatedBarberAppointmentsKey] })
        queryClient.invalidateQueries({ queryKey: [queryGetAllAuthenticatedBarberTodayAppointmentsKey] })
        queryClient.invalidateQueries({
          queryKey: [queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey]
        })
        queryClient.invalidateQueries({ queryKey: [queryGetAllAuthenticatedBarberWeekAppointmentsKey] })
        queryClient.invalidateQueries({ queryKey: [queryGetAllAuthenticatedBarberMonthAppointmentsKey] })
        toast({
          title: 'Agendamento cancelado com sucesso',
          status: 'success',
          isClosable: true
        })
        onClose()
      }
    })
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
            <Button colorScheme="red" onClick={handleSubmit} isLoading={isLoading}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertEmpty
