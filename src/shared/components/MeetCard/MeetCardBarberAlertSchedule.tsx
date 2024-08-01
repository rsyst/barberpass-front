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
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iAppointment, iService } from '@shared/interfaces'
import { useFetch, usePut } from '@shared/services'
import { removePhoneMask } from '@shared/utils'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

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
  const { data: services } = useFetch<iService[]>(QUERY_KEYS.GET_BARBER_SERVICES, ENDPOINTS.GET_BARBER_SERVICES)
  const { mutate: occupiedAppointment, isLoading: loadingMutate } = usePut(
    ENDPOINTS.PUT_BARBER_APPOINTMENTS_BY_ID_OCCUPIED(appointment?.id || '')
  )

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
        serviceId: formValues.serviceId
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_WEEK)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_DASHBOARD)
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
          <Button onClick={handleSubmit} isLoading={loadingMutate} colorScheme="blue">
            Agendar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstMeetCardBarberAlertSchedule
