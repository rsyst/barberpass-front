import React from 'react'
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

interface iProps {
  isOpen: boolean
  onClose: () => void
}

const RstFormScheduleMeet = ({ isOpen, onClose }: iProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>Realizar agendamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput label="Nome" placeholder="ex: João Pedro" />
          <RstInput label="Telefone" placeholder="(XX) XXXXX-XXXX" />
          <RstSelect label="Serviço">
            <option value="option1">Corte de cabelo</option>
            <option value="option2">Corte de barba</option>
          </RstSelect>
        </ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <RstButton variant="ghost" colorScheme="gray">
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
