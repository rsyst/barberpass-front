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
import { iBarberShop } from '@shared/interface/public'
import { useFetch, usePatch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'
import { RstBarberCard } from '../BarberCard/BarberCard'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barbershop: iBarberShop
}

export const RstBarbershopCardModalBarber = ({ isOpen, onClose, barbershop }: iProps) => {
  const { data: barbers, isLoading: loadingBarbers } = useFetch<iBarberShop[]>(
    QUERY_KEYS.GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS(barbershop.id),
    ENDPOINTS.GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS(barbershop.id)
  )
  console.log(barbers)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
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
