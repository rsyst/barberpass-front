import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  useToast
} from '@chakra-ui/react'
import RstButton from '../Button'
import moment from 'moment'
import React from 'react'
import { iAppointment } from '@shared/interfaces/public'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { usePut } from '@shared/services/use-queries'
import { useQueryClient } from '@tanstack/react-query'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardClientAlertSchedule = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: occupiedAppointment, isLoading: loadingMutate } = usePut(
    ENDPOINTS.PUT_CLIENT_APPOINTMENTS_BY_ID_OCCUPIED(appointment?.id || '')
  )

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    occupiedAppointment(
      {
        barberId: appointment.barberId,
        serviceId: appointment.service?.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            QUERY_KEYS.GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS_BY_DATE(
              appointment.barberId,
              appointment.service.id,
              moment(appointment.start).format('YYYY-MM-DD')
            )
          )
          queryClient.invalidateQueries(QUERY_KEYS.GET_CLIENT_APPOINTMENTS)
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

  console.log(appointment)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4} borderRadius={24}>
          <ModalHeader>Agendar horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja agendar este horário? </Text>
            <Flex gap={2}>
              <Text>Dia:</Text>
              <Text fontWeight={600}>{moment(appointment.start).format('DD/MM/YYYY')}</Text>
            </Flex>

            <Flex gap={2}>
              <Text>Hora:</Text>
              <Text fontWeight={600}>
                {moment(appointment.start).format('HH:mm')} -{' '}
                {moment(appointment.start)
                  .add(appointment?.service?.workAmount * (appointment?.barber?.timePerWork || 0), 'minutes')
                  .format('HH:mm')}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter p={6} justifyContent="space-between">
            <RstButton variant="ghost" colorScheme="gray" onClick={onClose}>
              Cancelar
            </RstButton>
            <RstButton onClick={handleSubmit} isLoading={loadingMutate}>
              Agendar
            </RstButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstMeetCardClientAlertSchedule
