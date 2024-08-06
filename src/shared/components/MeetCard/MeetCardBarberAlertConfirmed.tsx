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
import { RstInputCurrency } from '@shared/components'
import { iAppointment } from '@shared/interfaces'
import {
  queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey,
  queryGetAllAuthenticatedBarberAppointmentsKey,
  queryGetAllAuthenticatedBarberMonthAppointmentsKey,
  queryGetAllAuthenticatedBarberTodayAppointmentsKey,
  queryGetAllAuthenticatedBarberWeekAppointmentsKey,
  queryGetAuthenticatedBarberDashboardKey,
  useMutationBarberConfirmAnScheduleAppointment
} from '@shared/services'
import { currencyToNumber, floatToCurrency } from '@shared/utils'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertConfirmed = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: confirmedAppointment, isPending: isLoading } = useMutationBarberConfirmAnScheduleAppointment({
    appointmentId: appointment.id
  })

  const [price, setPrice] = React.useState(floatToCurrency(appointment.service?.price || 0))

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    confirmedAppointment(
      { price: currencyToNumber(price as string) },
      {
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
        <ModalContent mx={4} borderRadius={24}>
          <ModalHeader>Confirmar agendamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Você tem certeza que deseja confirmar este agendamento?</Text>

            <RstInputCurrency
              label="Valor do serviço"
              placeholder="R$ 00,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              helperText="Este é o valor que sera adicionado ao seu faturamento"
            />
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

export default RstMeetCardBarberAlertConfirmed
