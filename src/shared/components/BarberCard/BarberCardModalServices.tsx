import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import React from 'react'
import { iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { RstServiceCardClient } from '../ServiceCard/ServiceCardClient'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barber: iBarber
}

export const RstBarberCardModalServices = ({ isOpen, onClose, barber }: iProps) => {
  const { data: services, isLoading: loadingServices } = useFetch<iBarber[]>(
    QUERY_KEYS.GET_CLIENT_BARBERS_BY_ID_SERVICES(barber.id),
    ENDPOINTS.GET_CLIENT_BARBERS_BY_ID_SERVICES(barber.id)
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Agendar intervalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {services?.map((service) => (
              <RstServiceCardClient key={barber.id} service={service} barber={barber} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstBarberCardModalServices
