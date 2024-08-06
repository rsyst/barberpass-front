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
import { iAppointment } from '@shared/interfaces/public'
import {
  queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey,
  queryGetAllAuthenticatedBarberAppointmentsKey,
  queryGetAllAuthenticatedBarberMonthAppointmentsKey,
  queryGetAllAuthenticatedBarberTodayAppointmentsKey,
  queryGetAllAuthenticatedBarberWeekAppointmentsKey,
  queryGetAuthenticatedBarberDashboardKey,
  useMutationBarberScheduleABreakAppointment
} from '@shared/services'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertBreak = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: breakAppointment, isPending: isLoading } = useMutationBarberScheduleABreakAppointment({
    appointmentId: appointment.id
  })
  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    breakAppointment(null, {
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
          title: 'Intervalo agendado com sucesso',
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
          <ModalHeader>Agendar intervalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Você tem certeza que deseja agendar este horário como seu <b>Intervalo</b>?
            </Text>
          </ModalBody>

          <ModalFooter display="flex" gap={2} justifyContent="end" p={6}>
            <Button variant="ghost" colorScheme="gray" color="gray.1100" onClick={onClose} isLoading={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} isLoading={isLoading}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardBarberAlertBreak
