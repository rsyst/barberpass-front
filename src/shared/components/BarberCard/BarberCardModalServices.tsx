import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react'
import React from 'react'
import { iBarber, iService } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { RstServiceCardClient } from '../ServiceCard/ServiceCardClient'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barber: iBarber
}

export const RstBarberCardModalServices = ({ isOpen, onClose, barber }: iProps) => {
  const { data: services, isLoading: loadingServices } = useFetch<iService[]>(
    QUERY_KEYS.GET_CLIENT_BARBERS_BY_ID_SERVICES(barber.id),
    ENDPOINTS.GET_CLIENT_BARBERS_BY_ID_SERVICES(barber.id)
  )

  if (loadingServices) {
    return <></>
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4} h="90vh">
          <ModalHeader>Serviços disponíveis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={2}>
              {services?.map((service) => (
                <RstServiceCardClient key={barber.id} service={service} barber={barber} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstBarberCardModalServices
