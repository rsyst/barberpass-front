import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react'
import React from 'react'
import { iBarber, iService } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barber: iBarber
  service: iService
}

export const RstServiceCardClientModalAppointments = ({ isOpen, onClose, barber, service }: iProps) => {
  const { data: appointments, isLoading: loadingAppointments } = useFetch<iBarber[]>(
    QUERY_KEYS.GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS(barber.id, service.id),
    ENDPOINTS.GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS(barber.id, service.id)
  )

  console.log(appointments, loadingAppointments)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Agendar intervalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Você tem certeza que deseja agendar este horario como seu <b>Intervalo</b>?
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstServiceCardClientModalAppointments
