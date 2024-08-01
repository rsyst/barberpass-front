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
import { usePatch } from '@shared/services'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'
import { currencyToNumber, floatToCurrency } from '@shared/utils'
import { RstInputCurrency } from '@shared/components'

interface iProps {
  isOpen: boolean
  onClose: () => void
  appointment: iAppointment
}

export const RstMeetCardBarberAlertConfirmed = ({ isOpen, onClose, appointment }: iProps) => {
  const { mutate: confirmedAppointment, isLoading } = usePatch(
    ENDPOINTS.PATCH_BARBER_APPOINTMENTS_BY_ID_CONFIRMED(appointment?.groupIndex || '')
  )

  const [price, setPrice] = React.useState(floatToCurrency(appointment.service?.price || 0))

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleSubmit = () => {
    confirmedAppointment(
      { price: currencyToNumber(price as string) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_WEEK)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT)
          queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_DASHBOARD)
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
