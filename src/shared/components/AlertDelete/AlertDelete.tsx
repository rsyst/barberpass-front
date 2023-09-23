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

interface iProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  isLoading: boolean
  label?: string
  title?: string
}

export const RstAlertDelete = ({ isOpen, onClose, onSubmit, isLoading, label, title }: iProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || 'Deletar'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{label || 'Tem certeza que deseja deletar?'}</ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <RstButton variant="ghost" colorScheme="gray" isLoading={isLoading}>
            Cancelar
          </RstButton>
          <RstButton colorScheme="red" onClick={onSubmit} isLoading={isLoading}>
            Deletar
          </RstButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
