import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import RstButton from '../Button'
import RstInput from '../Input'
import RstSelect from '../Select'
import { useFetch } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iService } from '@shared/interface/public'
import RstInputPhone from '../Input/InputPhone'

interface iProps {
  isOpen: boolean
  onClose: () => void
}

interface iFormMeet {
  name: string
  phoneNumber: string
  serviceId: string
}

const RstFormScheduleMeet = ({ isOpen, onClose }: iProps) => {
  const { data: services } = useFetch<iService[]>(QUERY_KEYS.GET_BARBER_SERVICES, ENDPOINTS.GET_BARBER_SERVICES)
  const [formValues, setFormValues] = useState({} as iFormMeet)

  const handleChangeValue = (fname: keyof iFormMeet, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>Realizar agendamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput
            label="Nome"
            placeholder="ex: João Pedro"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
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
          >
            {services?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </RstSelect>
        </ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <RstButton variant="ghost" colorScheme="gray" onClick={onClose}>
            Cancelar
          </RstButton>
          <RstButton colorScheme="blue" onClick={onClose}>
            Agendar
          </RstButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstFormScheduleMeet
