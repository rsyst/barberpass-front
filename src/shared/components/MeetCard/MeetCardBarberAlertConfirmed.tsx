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
import RstInputCurrency from '../Input/InputCurrency'
import { currencyToNumber, floatToCurrency } from '@shared/utils/currencyMask'

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
        <ModalContent m={4}>
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

export default RstMeetCardBarberAlertConfirmed
