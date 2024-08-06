import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import { RstInput, RstInputPhone, RstSelect } from '@shared/components'
import { iAppointment } from '@shared/interfaces'
import {
  queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey,
  queryGetAllAuthenticatedBarberAppointmentsKey,
  queryGetAllAuthenticatedBarberMonthAppointmentsKey,
  queryGetAllAuthenticatedBarberTodayAppointmentsKey,
  queryGetAllAuthenticatedBarberWeekAppointmentsKey,
  queryGetAuthenticatedBarberDashboardKey,
  useMutationBarberScheduleAnAppointment,
  useQueryGetAllAuthenticatedBarberServices
} from '@shared/services'
import { removePhoneMask } from '@shared/utils'
import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

interface iFormMeet {
  name: string
  phoneNumber: string
  serviceId: string
}

const RstMeetCardBarberAlertSchedule = ({ isOpen, onClose, appointment }: iProps) => {
  const { data: services } = useQueryGetAllAuthenticatedBarberServices()
  const { mutate: occupiedAppointment, isPending: loadingMutate } = useMutationBarberScheduleAnAppointment({
    appointmentId: appointment.id
  })

  const queryClient = useQueryClient()
  const toast = useToast()

  const [formValues, setFormValues] = useState({} as iFormMeet)

  const handleChangeValue = (fname: keyof iFormMeet, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    occupiedAppointment(
      {
        name: formValues.name,
        phoneNumber: removePhoneMask(formValues.phoneNumber || ''),
        serviceId: formValues.serviceId,
        price: services?.find((service) => service.id === formValues.serviceId)?.price || 0
      },
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
            title: 'Agendamento realizado com sucesso',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
          onClose()
        },
        onError: (error) => {
          toast({
            title: 'Erro ao realizar agendamento',
            description: error?.response?.data?.message,
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        }
      }
    )
  }

  const validationSchema = useMemo(() => {
    if (!formValues.name || !formValues.serviceId) {
      return true
    }
  }, [formValues])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={4} borderRadius={24}>
        <ModalHeader>Realizar agendamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput
            label="Nome"
            placeholder="ex: João Pedro"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
            isRequired
          />
          <RstInputPhone
            label="Telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={formValues.phoneNumber}
            onChange={({ target }) => handleChangeValue('phoneNumber', target.value)}
          />
          <RstSelect
            label="Serviço"
            placeholder="Selecione um serviço"
            value={formValues.serviceId}
            onChange={({ target }) => handleChangeValue('serviceId', target.value)}
            isRequired
          >
            {services?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </RstSelect>
        </ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <Button variant="ghost" colorScheme="gray" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} isLoading={loadingMutate} colorScheme="blue" isDisabled={validationSchema}>
            Agendar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstMeetCardBarberAlertSchedule
