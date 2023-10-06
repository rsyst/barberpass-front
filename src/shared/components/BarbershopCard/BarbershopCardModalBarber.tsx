import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import React from 'react'
import { iBarber, iBarberShop } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { RstBarberCard } from '../BarberCard/BarberCard'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barbershop: iBarberShop
}

export const RstBarbershopCardModalBarber = ({ isOpen, onClose, barbershop }: iProps) => {
  const { data: barbers, isLoading: loadingBarbers } = useFetch<iBarber[]>(
    QUERY_KEYS.GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS(barbershop.id),
    ENDPOINTS.GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS(barbershop.id)
  )

  if (loadingBarbers) {
    return <></>
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4} h="90vh">
          <ModalHeader>Profissionais</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={3}>
            {barbers?.map((barber) => (
              <RstBarberCard key={barber.id} {...barber} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstBarbershopCardModalBarber
